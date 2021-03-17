import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import { signUp } from "../../services/User";
import { notification } from "../../components/notifications";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      notification(
        "Erro",
        "Senha e confirmação de senha não conferem!",
        "danger"
      );
      setLoading(false);
      return;
    }

    if (!name) {
      notification("Erro", "Nome não pode ficar em branco!", "danger");
      setLoading(false);
      return;
    }
    if (!email) {
      notification("Erro", "E-mail não pode ficar em branco!", "danger");
      setLoading(false);
      return;
    }

    if (!password) {
      notification("Erro", "Senha não pode ficar em branco!", "danger");
      setLoading(false);
      return;
    }

    signUp(name, email, password)
      .then(() => {
        history.push("/login");
        notification("Sucesso", "Conta criada com sucesso!", "success");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        notification("Erro", err.response.data.message, "danger");
        setLoading(false);
      });
  };

  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="karaoke" />
        <form onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={FiUser}
            type="text"
            placeholder="Nome"
          />
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FiMail}
            type="email"
            placeholder="E-mail"
          />
          <Input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={FiLock}
            type="confirmPassword"
            placeholder="Confirmar senha"
          />
          <Button loading={loading}>Cadastrar</Button>
        </form>
        <Link to="login">
          <FiArrowLeft size={16} />
          Voltar ao login
        </Link>
      </Content>
    </Container>
  );
};

export default Register;
