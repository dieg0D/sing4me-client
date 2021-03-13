import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../services/socket";
import Peer from "simple-peer";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import MyVideo from "../../components/MyVideo";
import { Container } from "./styles";
import PeerVideo from "../../components/PeerVideo";
import { notification } from "../../components/notifications";

const videoConstraints = {
  height: window.innerHeight,
  width: window.innerWidth,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const history = useHistory();
  const userVideo = useRef();
  const peersRef = useRef([]);

  const { roomID } = useParams();

  const mergeAudioStreams = (audioStream, camStream) => {
    const context = new AudioContext();
    const destination = context.createMediaStreamDestination();

    if (audioStream && audioStream.getAudioTracks().length > 0) {
      const source1 = context.createMediaStreamSource(audioStream);

      source1.connect(destination);
    }

    if (camStream && camStream.getAudioTracks().length > 0) {
      const source2 = context.createMediaStreamSource(camStream);

      source2.connect(destination);
    }

    return destination.stream.getAudioTracks();
  };

  useEffect(() => {
    const route = sessionStorage.getItem("@sing4me:room");
    const mediaDevices = navigator.mediaDevices;

    if (route !== roomID) {
      notification(
        "Permissão negada!",
        "Para acessar a sala você deve selecioná-la na página ínicial e inserir a senha da mesma.",
        "danger"
      );
      history.push(`/`);
    } else {
      mediaDevices
        .getDisplayMedia({
          video: true,
          audio: true,
        })
        .then((desktopStream) => {
          mediaDevices
            .getUserMedia({ video: videoConstraints, audio: true })
            .then((camStream) => {
              const tracks = [
                ...camStream.getVideoTracks(),
                ...mergeAudioStreams(desktopStream, camStream),
              ];

              userVideo.current.srcObject = camStream;

              const stream = new MediaStream(tracks);

              socket.emit("join room", roomID);

              socket.on("room full", () => {
                notification("Erro", "Sala cheia =(", "danger");
                history.push(`/`);
              });

              socket.on("all users", (users) => {
                const peers = [];
                users.forEach((userID) => {
                  const peer = createPeer(userID, socket.id, stream);
                  peersRef.current.push({
                    peerID: userID,
                    peer,
                  });
                  peers.push(peer);
                });
                setPeers(peers);
              });

              socket.on("user joined", (payload) => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                  peerID: payload.callerID,
                  peer,
                });

                setPeers(peersRef.current.map((item) => item.peer));
              });

              socket.on("receiving returned signal", (payload) => {
                const item = peersRef.current.find(
                  (p) => p.peerID === payload.id
                );
                try {
                  item.peer.signal(payload.signal);
                } catch (err) {
                  console.log(err);
                }
              });

              socket.on("remove user", (removedUserID) => {
                const peerObj = peersRef.current.find(
                  (item) => item.peerID === removedUserID
                );

                if (peerObj) {
                  peerObj.peer.destroy();
                }
                peersRef.current = peersRef.current.filter(
                  (item) => item.peerID !== removedUserID
                );

                setPeers(peersRef.current.map((item) => item.peer));
              });
            });
        })
        .catch(() => {
          notification(
            "Erro",
            "Para poder utilizar o sing4me você precisa autorizar o uso da sua camera, microfone e a transmissão da sua tela !",
            "danger"
          );
          history.push(`/`);
        });
    }
    return () => {
      sessionStorage.setItem("@sing4me:room", "");
    };
  }, [roomID, history]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <>
      <Header />
      <Container>
        <div className="wrapper">
          <div className="content">
            <MyVideo stream={userVideo} />
            {peers.map((peer, index) => {
              return <PeerVideo key={index} peer={peer} />;
            })}
          </div>
          <div className="menu">
            <Button>Confirmar</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Room;
