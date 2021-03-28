import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Search from "../../components/Search";
import Modal from "../../components/Modal";
import Particles from "react-tsparticles";

import { FiRefreshCw, FiEdit3, FiLock, FiUsers } from "react-icons/fi";
import { Container, Content } from "./styles";
import { useHistory } from "react-router-dom";
import { getRooms, createRooms } from "../../services/Room";
import { notification } from "../../components/notifications";

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [room, setRoom] = useState({});
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getRooms()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const refresh = () => {
    getRooms()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createRooms(name, password)
      .then((res) => {
        sessionStorage.setItem("@sing4me:room", res?.data?.id);
        history.push(`/room/${res?.data?.id}`);
      })
      .catch((err) =>
        notification("Erro", err?.response?.data?.message, "danger")
      );
  };

  return (
    <Container>
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
      <Content>
        <div className="rooms">
          <div className="search">
            <Search onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="container">
            {data
              .filter((e) =>
                e.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((room, index) => (
                <div
                  key={index}
                  className="room"
                  onClick={() => {
                    setRoom(room);
                    setOpen(true);
                  }}
                >
                  <h3>{room?.name}</h3>
                  <p style={{ color: room?.length < 4 ? "white" : "red" }}>
                    <FiUsers size={20} />
                    {room?.length}/4
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="side-menu">
          <div className="update">
            <h2>Atualizar</h2>
            <div onClick={() => refresh()}>
              <FiRefreshCw size={25} />
            </div>
          </div>
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <h2>Criar nova sala</h2>
              <div className="container">
                <Input
                  className="input"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={FiEdit3}
                  type="text"
                  placeholder="Nome"
                  autoComplete="off"
                />

                <Input
                  className="input"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                  autoComplete="off"
                />
              </div>

              <Button>Confirmar</Button>
            </form>
          </div>
        </div>
      </Content>
      <Modal open={open} setOpen={setOpen} room={room} />
    </Container>
  );
};

export default Home;
