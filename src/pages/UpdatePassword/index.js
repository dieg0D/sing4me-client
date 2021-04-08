import React, { useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useAuth } from "../../contexts/AuthContext";

import { FiLock } from "react-icons/fi";
import { Container, Content } from "./styles";
import { updatePassword } from "../../services/User";
import { notification } from "../../components/notifications";

const UpdatePassword = () => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      notification(
        "Erro",
        "A nova senha e confirmação de senha não conferem!",
        "danger"
      );
      setLoading(false);
      return;
    }

    if (!oldPassword) {
      notification("Erro", "Senha antiga não pode ficar em branco!", "danger");
      setLoading(false);
      return;
    }
    if (!newPassword) {
      notification("Erro", "Nova senha não pode ficar em branco!", "danger");
      setLoading(false);
      return;
    }

    if (!confirmPassword) {
      notification(
        "Erro",
        "Confirmação de senha não pode ficar em branco!",
        "danger"
      );
      setLoading(false);
      return;
    }
    updatePassword(oldPassword, newPassword)
      .then(() => {
        notification("Sucesso", "Senha atualizada com sucesso!", "success");
        setLoading(false);
      })
      .catch((err) => {
        notification("Erro", err.response.data.message, "danger");
        setLoading(false);
      });
  };

  return (
    <Container>
      <Header />
      <Content>
        <div className="wrapper">
          <img
            src={`https://drive.google.com/uc?export=view&id=${user?.avatar}`}
            alt="Avatar"
          />
          <p>{user?.name}</p>
          <p>{user?.email}</p>
          <form onSubmit={handleSubmit}>
            <Input
              className="input"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              className="input"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              className="input"
              name="comfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={FiLock}
              type="password"
              placeholder="Confirmar nova senha"
            />

            <Button loading={loading}>Confirmar</Button>
          </form>
        </div>
      </Content>
    </Container>
  );
};

export default UpdatePassword;
