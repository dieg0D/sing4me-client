import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Input from "../Input";
import Button from "../Button";
import { FiLock, FiUsers } from "react-icons/fi";

import { Container, Modall } from "./styles";
import { useHistory } from "react-router-dom";
import { enterRoom } from "../../services/Room";
import { notification } from "../../components/notifications";

interface RoomType {
  id: string;
  name: string;
  length: number;
}

interface ModalProps {
  open: any;
  setOpen: any;
  room: RoomType;
}

const ModalComponent: React.FC<ModalProps> = ({ open, setOpen, room }) => {
  const history = useHistory();
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    enterRoom(room.id, password)
      .then((res) => {
        localStorage.setItem("@sing4me:room", res.data.id);
        history.push(`/room/${res.data.id}`);
      })
      .catch((err) => notification("Erro", err.response.data.error, "danger"));
  };

  return (
    <Modall
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container>
          <h1>{room?.name}</h1>
          <p>
            <FiUsers size={20} />
            {room?.length}/6
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              name="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button>Entrar na sala</Button>
          </form>
        </Container>
      </Fade>
    </Modall>
  );
};

export default ModalComponent;
