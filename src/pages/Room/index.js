import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import MyVideo from "../../components/MyVideo";
import Header from "../../components/Header";
import PeerVideo from "../../components/PeerVideo";
import Input from "../../components/Input";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import socketIO from "socket.io-client";

import { useParams, useHistory } from "react-router-dom";
import { Container, Menu } from "./styles";
import { notification } from "../../components/notifications";
import { getMusic, searchMusic } from "../../services/Music";
import { FiSearch, FiYoutube, FiMenu, FiX, FiRefreshCcw } from "react-icons/fi";
import { url } from "../../services/api";
import { Fab, Action } from "react-tiny-fab";

import "react-tiny-fab/dist/styles.css";

const Room = () => {
  const [peers, setPeers] = useState([]);
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [active, setActive] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentSinger, setCurrentSinger] = useState("");

  const history = useHistory();
  const userVideo = useRef();
  const karaokeVideo = useRef();
  const socket = useRef();

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
    socket.current = socketIO(url);

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
        .getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: true,
        })
        .then((stream) => {
          userVideo.current.srcObject = stream;

          socket.current.emit("join room", roomID);

          socket.current.on("room full", () => {
            notification("Erro", "Sala cheia =(", "danger");
            history.push(`/`);
          });

          socket.current.on("all users", (users) => {
            const peersN = [];

            users.forEach((userID) => {
              const peer = createPeer(userID, socket.current.id, stream);
              peersRef.current.push({
                peerID: userID,
                peer,
              });
              peersN.push({
                peerID: userID,
                peer,
              });
            });
            setPeers(peersN);
          });

          socket.current.on("user joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            const peerObj = {
              peerID: payload.callerID,
              peer,
            };

            setPeers((p) => [...p, peerObj]);
          });

          socket.current.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            item.peer.signal(payload.signal);
          });

          socket.current.on("current singer", (id) => {
            console.log("olha o id: " + id);
            setCurrentSinger(id);
          });

          socket.current.on("remove user", (removedUserID) => {
            const peerObj = peersRef.current.find(
              (item) => item.peerID === removedUserID
            );

            if (peerObj) {
              peerObj.peer.destroy();
            }
            const peersN = peersRef.current.filter(
              (item) => item.peerID !== removedUserID
            );
            peersRef.current = peersN;

            setPeers(peersN);
          });
        })
        .catch((e) => {
          console.log(e);
          notification(
            "Erro",
            "Para poder utilizar o sing4me você precisa autorizar o uso da sua camera, microfone !",
            "danger"
          );
          history.push(`/`);
        });
    }
    let usersToClean = userVideo.current;
    return () => {
      sessionStorage.setItem("@sing4me:room", "");
      try {
        peersRef.current.forEach((item) => item.peer.destroy());
        usersToClean.srcObject.getTracks().forEach((track) => track.stop());
        socket.current.close();
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("sending signal", {
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
      trickle: true,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function searchVideo(e) {
    e.preventDefault();
    setLoading(true);
    setVideos([]);
    searchMusic(`${title} karaoke`)
      .then((res) => {
        console.log(res.data);
        setVideos(res.data?.items.filter((i) => i?.type === "video"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function replaceStream() {
    const tracks = [
      ...userVideo.current.srcObject.getVideoTracks(),
      ...mergeAudioStreams(
        karaokeVideo.current.captureStream(),
        userVideo.current.srcObject
      ),
    ];

    const stream = new MediaStream(tracks);
    console.log(stream);

    peersRef.current.forEach((peer) => {
      if (peer) {
        peer.peer.replaceTrack &&
          peer.peer.replaceTrack(
            peer.peer.streams[0].getAudioTracks()[0],
            stream.getAudioTracks()[0],
            peer.peer.streams[0]
          );
      }
    });
  }

  function playMusic(id) {
    setVideoId(id);
    setLoading2(true);
    getMusic(id)
      .then(async (res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        karaokeVideo.current.src = url;
        karaokeVideo.current.style = "display: inline-block";
        karaokeVideo.current.disablePictureInPicture = true;
        await karaokeVideo.current.play();
        replaceStream();
        setActive(true);
        setLoading2(false);
        setVisible(false);
        socket.current.emit("singing", roomID);
      })
      .catch((err) => {
        notification(
          "Erro ao executar media!",
          "Parece que esse video não pode ser executado, por favor tente outra versão",
          "danger"
        );
        console.error(err);
        setLoading2(false);
      });
  }

  async function reset() {
    await karaokeVideo.current.pause();
    karaokeVideo.current.style = "display: none";
    setTitle("");
    setVideos([]);
    setVideoId("");
    setActive(false);
    socket.current.emit("remove singer", roomID);
  }

  return (
    <>
      <Header />
      <Container
        videos={
          currentSinger !== ""
            ? [...new Map(peers.map((item) => [item.peerID, item])).values()]
                .length - 1
            : [...new Map(peers.map((item) => [item.peerID, item])).values()]
                .length
        }
      >
        <div className="wrapper">
          <div
            className="video-box"
            style={{ display: active || currentSinger !== "" ? "" : "none" }}
          >
            {active
              ? undefined
              : [
                  ...new Map(peers.map((item) => [item.peerID, item])).values(),
                ].map((peer) => {
                  return (
                    <PeerVideo
                      key={peer.peerID}
                      peer={peer.peer}
                      currentSinger={
                        currentSinger === peer.peerID ? false : true
                      }
                    />
                  );
                })}
            <video
              ref={karaokeVideo}
              id="youtube"
              className="youtube"
              crossOrigin="anonymous"
              controls
              autoPlay
              controlsList="nodownload"
              style={{ display: "none" }}
            ></video>
          </div>
          <div
            className={active || currentSinger !== "" ? "content2" : "content"}
          >
            {[
              ...new Map(peers.map((item) => [item.peerID, item])).values(),
            ].map((peer) => {
              return (
                <PeerVideo
                  key={peer.peerID}
                  peer={peer.peer}
                  currentSinger={currentSinger === peer.peerID ? true : false}
                />
              );
            })}
            <MyVideo stream={userVideo} />
          </div>
        </div>
        <Drawer anchor="right" open={visible} onClose={() => setVisible(false)}>
          <Menu>
            <div>
              <form onSubmit={searchVideo}>
                <Input
                  name="video"
                  icon={FiYoutube}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Buscar música"
                  autoComplete="off"
                />
                <button disabled={title.length <= 0 ? "disabled" : ""}>
                  <FiSearch size={20} />
                </button>
              </form>
            </div>
            {loading ? (
              <div className="loader">
                <CircularProgress style={{ color: "darkviolet" }} />
              </div>
            ) : undefined}
            <div className="VideoCardsContainer ">
              {videos.map((video, index) => {
                return (
                  <div
                    key={index}
                    className="videoCard"
                    onClick={() => playMusic(video?.id)}
                  >
                    {loading2 && videoId === video?.id ? (
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url("${video?.bestThumbnail?.url}")`,
                        }}
                      >
                        <CircularProgress
                          style={{ color: "darkviolet" }}
                          size={20}
                        />
                      </div>
                    ) : (
                      <img
                        src={video?.bestThumbnail?.url}
                        alt="video thumbnail"
                      />
                    )}
                    <div className="description">
                      <p>{video?.title} </p>
                      <p className="duration">{video?.duration} </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Menu>
        </Drawer>
        <Fab
          mainButtonStyles={{ backgroundColor: "darkviolet" }}
          icon={<FiMenu size={20} />}
          alwaysShowTitle={true}
        >
          <Action
            style={{ backgroundColor: "#212121" }}
            text="Sair da sala"
            onClick={() => history.push(`/`)}
          >
            <FiX size={20} color="darkviolet" />
          </Action>
          {active ? (
            <Action
              style={{ backgroundColor: "#212121" }}
              text="Resetar música"
              onClick={() => reset()}
            >
              <FiRefreshCcw size={20} color="darkviolet" />
            </Action>
          ) : undefined}
          {currentSinger === "" ? (
            <Action
              style={{ backgroundColor: "#212121" }}
              text="Buscar música"
              onClick={() => setVisible(true)}
            >
              <FiSearch size={20} color="darkviolet" />
            </Action>
          ) : undefined}
        </Fab>
      </Container>
    </>
  );
};

export default Room;
