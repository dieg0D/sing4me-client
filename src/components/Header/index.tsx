import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.svg";
import Input from "../Input";
import Button from "../Button";
import ListIcons from "../ListIcons";
import Drawer from "@material-ui/core/Drawer";
import { FiUser, FiLogOut, FiLock } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { updateName } from "../../services/User";
import { Link } from "react-router-dom";

import { Container, Content } from "./styles";

const Header: React.FC = () => {
  const { user, signOut, updateData } = useAuth();
  const [visible, setVisible] = useState(false);
  const [showList, setShowList] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(user ? user?.name : "");
  }, [visible, user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateName(name)
      .then((res) => updateData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className="left">
        <img src={Logo} alt="karaoke" />
        <Link className="link" to="/">
          Início
        </Link>
        <Link className="link" to="/">
          Sobre
        </Link>
        <Link className="link" to="/">
          Ajuda
        </Link>
      </div>
      <div className="right">
        <div>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>

        <img
          onClick={() => setVisible(true)}
          src={`https://drive.google.com/uc?export=view&id=${user?.avatar}`}
          alt="Avatar"
        />
      </div>
      <Drawer anchor="right" open={visible} onClose={() => setVisible(false)}>
        {showList ? (
          <ListIcons setShowList={setShowList} />
        ) : (
          <Content>
            <div></div>
            <div>
              <div>
                <FaCamera size={16} />
              </div>
              <img
                onClick={() => setShowList(true)}
                src={`https://drive.google.com/uc?export=view&id=${user?.avatar}`}
                alt="Avatar"
              />
            </div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>

            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button>Atualizar nome</Button>
            </form>
            <Link to="/update-password" className="link">
              <FiLock size={20} />
              Alterar senha
            </Link>
            <p className="link" onClick={() => signOut()}>
              <FiLogOut size={20} />
              Sair
            </p>
          </Content>
        )}
      </Drawer>
    </Container>
  );
};

export default Header;
