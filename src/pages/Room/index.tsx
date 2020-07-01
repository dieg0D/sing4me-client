import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import Input from "../../components/Input";
import { FiSearch, FiYoutube } from "react-icons/fi";

import Header from "../../components/Header";
import MyVideo from "../../components/MyVideo";
import PeerVideo from "../../components/PeerVideo";
import Button from "../../components/Button";
import Peer from "simple-peer";
import { socket } from "../../services/socket";
import { useParams, useHistory } from "react-router-dom";
import { notification } from "../../components/notifications";
import { useAuth } from "../../contexts/AuthContext";

import { Container } from "./styles";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = () => {
  const { user } = useAuth();
  const [peers, setPeers] = useState<any>([] as any);
  const [queue, setQueue] = useState<any>([] as any);
  const [url, setUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState<any>([] as any);
  const [myVideo, setMyvideo] = useState(null);
  const peersRef = useRef([] as any);
  const { id } = useParams();
  const history = useHistory();

  const mergeAudioStreams = useCallback(
    (desktopStream: any, camStream: any) => {
      const context = new AudioContext();
      const destination = context.createMediaStreamDestination();

      if (desktopStream && desktopStream.getAudioTracks().length > 0) {
        const source1 = context.createMediaStreamSource(desktopStream);
        const desktopGain = context.createGain();
        desktopGain.gain.value = 0.7;
        source1.connect(desktopGain).connect(destination);
      }

      if (camStream && camStream.getAudioTracks().length > 0) {
        const source2 = context.createMediaStreamSource(camStream);
        const camGain = context.createGain();
        camGain.gain.value = 0.7;
        source2.connect(camGain).connect(destination);
      }

      return destination.stream.getAudioTracks();
    },
    []
  );

  const createPeer = useCallback(
    (data: any, callerID: any, stream: any) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("sending signal", {
          userToSignal: data.id,
          callerID,
          signal,
          userID: data.userID,
          roomID: id,
        });
      });

      return peer;
    },
    [id]
  );

  const addPeer = useCallback(
    (incomingSignal: any, callerID: any, stream: any) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returning signal", {
          signal,
          callerID,
          userID: incomingSignal.userID,
          roomID: id,
        });
      });

      peer.signal(incomingSignal.signal);

      return peer;
    },
    [id]
  );

  useEffect(() => {
    const route = sessionStorage.getItem("@sing4me:room");

    if (route !== id) {
      notification(
        "Permissão negada!",
        "Para acessar a sala você deve selecioná-la na página ínicial e inserir a senha da mesma.",
        "danger"
      );
      history.push(`/`);
    } else {
      const mediaDevices = navigator.mediaDevices as any;
      mediaDevices
        .getDisplayMedia({
          video: true,
          audio: true,
        })
        .then((desktopStream: any) => {
          mediaDevices
            .getUserMedia({ video: videoConstraints, audio: true })
            .then((camStream: any) => {
              setMyvideo(camStream);

              const tracks = [
                ...camStream.getVideoTracks(),
                ...mergeAudioStreams(desktopStream, camStream),
              ];

              const stream = new MediaStream(tracks);

              socket.emit("join room", {
                roomID: id,
                userID: user?.id,
              });
              socket.on("room full", () => {
                notification("Erro", "Sala cheia =(", "danger");
                history.push(`/`);
              });

              socket.on("all users", (users: Array<any>) => {
                const newPeer = [] as any;
                users.forEach((data: any) => {
                  if (data.userID !== user?.id) {
                    const peer = createPeer(data, socket.id, stream);
                    peersRef.current = [];
                    peersRef.current.push({
                      peerID: data.id,
                      peer,
                      userID: data.userID,
                    });
                    newPeer.push({ peer, userID: data.userID });
                  }
                });

                setPeers(newPeer);
                setQueue(users);
              });

              socket.on("user joined", (payload: any) => {
                const addedPeer = addPeer(payload, payload.callerID, stream);
                peersRef.current.push({
                  peerID: payload.callerID,
                  peer: addedPeer,
                  userID: payload.userID,
                });

                setPeers((users: any) => [
                  ...users,
                  { peer: addedPeer, userID: payload.userID },
                ]);
                socket.emit("add to queue", id);
              });

              socket.on("receiving returned signal", (payload: any) => {
                const item: any = peersRef.current.find(
                  (p: any) => p.peerID === payload.id
                );
                item.peer?.signal(payload.signal);
              });

              socket.on("update queue", (users: Array<any>) => {
                const newPeer = [] as any;
                users.forEach((data: any) => {
                  if (data.userID !== user?.id) {
                    const peer = createPeer(data, socket.id, stream);
                    peersRef.current = [];
                    peersRef.current.push({
                      peerID: data.id,
                      peer,
                      userID: data.userID,
                    });
                    newPeer.push({ peer, userID: data.userID });
                  }
                });

                setPeers(newPeer);
                setQueue(users);
              });

              socket.on("refresh queue", (users: Array<any>) => {
                setQueue(users);
              });
              
              socket.on("remove user", (removedUser: any) => {
                peersRef.current = peersRef.current.filter(
                  (item: any) => item.peerID !== removedUser.id
                );

                setPeers(
                  peersRef.current.map((item: any) => ({
                    peer: item.peer,
                    userID: item.userID,
                  }))
                );
                socket.emit("request update", id);
              });
            });
        })
        .catch(() => {
          notification(
            "Erro",
            "Para poder utilizar o sing4me você precisa autorizar o uso da sua camera, microfone e a transmissão da sua tela =(",
            "danger"
          );
          history.push(`/`);
        });
    }

    return () => {
      sessionStorage.setItem("@sing4me:room", "");
    };
    // eslint-disable-next-line
  }, [id, history, addPeer, createPeer, mergeAudioStreams]);

  useEffect(() => {
    const updatedVideos: any = [];
    queue.map((item: any, index: number) => {
      if (item?.userID === user?.id) {
        updatedVideos.push(<MyVideo key={index} stream={myVideo} />);
      } else {
        const peer = peers.find((p: any) => p?.userID === item?.userID);
        if (peer?.peer) {
          updatedVideos.push(<PeerVideo key={index} peer={peer.peer} />);
        }
      }
      return null;
    });

    setVideos(updatedVideos);
  }, [queue, peers, user, myVideo]);

  const next = useCallback(() => {
    socket.emit("next queue", id);
    setShowVideo(false);
    setUrl("");
  }, [id]);

  const resetVideo = useCallback(() => {
    setShowVideo(false);
    setUrl("");
  }, []);

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();

    setShowVideo(true);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="wrapper">
          <div className="content" id="content">
            {videos[0] ?? undefined}

            {user && queue && queue[0]?.userID === user?.id ? (
              <div className="menu">
                {showVideo ? (
                  <ReactPlayer
                    controls
                    url={url}
                    width="100%"
                    height="100%"
                    onEnded={() => next()}
                  />
                ) : (
                  <div>
                    <h2>Insira a url do vídeo</h2>
                    <form onSubmit={handleSubmit}>
                      <Input
                        name="video"
                        icon={FiYoutube}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        type="text"
                        placeholder="Buscar video"
                      />
                      <button>
                        <FiSearch size={20} />
                      </button>
                    </form>
                  </div>
                )}
                {showVideo ? (
                  <div className="buttons">
                    <Button className="outline" onClick={() => resetVideo()}>
                      Trocar musica
                    </Button>{" "}
                    <Button onClick={() => next()}>Passar a vez</Button>{" "}
                  </div>
                ) : (
                  <Button onClick={() => next()}>Passar a vez</Button>
                )}
              </div>
            ) : undefined}
          </div>

          <div className="row" id="row">
            {videos
              .filter((element: any, index: number) => index !== 0)
              .map((video: any, index: number) => video)}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Room;
