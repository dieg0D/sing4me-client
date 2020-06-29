import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Search from "../../components/Search";
import Modal from "../../components/Modal";

import { FiRefreshCw, FiEdit3, FiLock, FiUsers } from "react-icons/fi";
import { Container, Content } from "./styles";
import { useHistory } from "react-router-dom";
import { getRooms, createRooms } from "../../services/Room";
import { notification } from "../../components/notifications";

interface RoomType {
  id: string;
  name: string;
  length: number;
}

const Home: React.FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Array<RoomType>>([]);
  const [room, setRoom] = useState<RoomType>({} as RoomType);
  const [name, setName] = useState("");
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createRooms(name, password)
      .then((res) => {
        localStorage.setItem("@sing4me:room", res.data.id);
        history.push(`/room/${res.data.id}`);
      })
      .catch((err) => notification("Erro", err.response.data.error, "danger"));
  };

  return (
    <Container>
      <Header />
      <Content>
        <div className="rooms">
          <div className="search">
            <Search />
          </div>
          <div className="container">
            {data.map((room, index) => (
              <div
                key={index}
                className="room"
                onClick={() => {
                  setRoom(room);
                  setOpen(true);
                }}
              >
                <h3>{room?.name}</h3>
                <p>
                  <FiUsers size={20} />
                  {room?.length}/6
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
                />

                <Input
                  className="input"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
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
