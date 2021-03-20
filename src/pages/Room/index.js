import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import MyVideo from "../../components/MyVideo";
import Header from "../../components/Header";
import PeerVideo from "../../components/PeerVideo";
import Input from "../../components/Input";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import socketIO from "socket.io-client";
import Particles from "react-tsparticles";

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

  const history = useHistory();
  const userVideo = useRef();
  const karaokeVideo = useRef();

  const socket = socketIO(url);
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
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 1024 },
            facingMode: "user",
          },
          audio: true,
        })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }

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
              peers.push({
                peerID: userID,
                peer,
              });
            });
            setPeers(peers);
          });

          socket.on("user joined", (payload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((p) => [
              ...p,
              {
                peerID: payload.callerID,
                peer,
              },
            ]);
          });

          socket.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
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

            setPeers(peersRef.current.map((item) => item));
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
    return () => {
      sessionStorage.setItem("@sing4me:room", "");
      try {
        // eslint-disable-next-line
        userVideo.current.srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line
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

  function searchVideo(e) {
    e.preventDefault();
    setLoading(true);
    setVideos([]);
    searchMusic(`${title} karaoke`)
      .then((res) => {
        console.log(res.data);
        setVideos(res.data?.items);
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
      })
      .catch((err) => {
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
  }

  return (
    <>
      <Header />
      <Particles
        height="89vh"
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#313131",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <Container videos={peers.length}>
        <div className="wrapper">
          <div className="video-box" style={{ display: active ? "" : "none" }}>
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
          <div className={active ? "content2" : "content"}>
            {peers.map((peer) => {
              return <PeerVideo key={peer.peerID} peer={peer.peer} />;
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
                  placeholder="Buscar musica"
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
                    <img
                      src={video?.bestThumbnail?.url}
                      alt="video thumbnail"
                    />
                    {loading2 && videoId === video?.id ? (
                      <div>
                        <CircularProgress
                          style={{ color: "darkviolet", marginLeft: "45%" }}
                          size={20}
                        />
                      </div>
                    ) : (
                      <div>
                        <p>{video?.title} </p>
                        <p className="duration">{video?.duration} </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Menu>
        </Drawer>
        <Fab
          mainButtonStyles={{ backgroundColor: "darkviolet" }}
          icon={<FiMenu size={20} />}
          event={"hover"}
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
              text="Resetar musica"
              onClick={() => reset()}
            >
              <FiRefreshCcw size={20} color="darkviolet" />
            </Action>
          ) : undefined}
          <Action
            style={{ backgroundColor: "#212121" }}
            text="Buscar musica"
            onClick={() => setVisible(true)}
          >
            <FiSearch size={20} color="darkviolet" />
          </Action>
        </Fab>
      </Container>
    </>
  );
};

export default Room;
