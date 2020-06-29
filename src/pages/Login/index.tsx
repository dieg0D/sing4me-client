import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import { useAuth } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const user = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    user.signIn(email, password);
  };

  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="karaoke" />
        <form onSubmit={handleSubmit}>
          <h2>Entre para cantar</h2>
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
          <Button>Entrar</Button>
          <Link to="recover-password">Esqueci minha senha</Link>
        </form>
        <Link to="register">
          <FiLogIn size={16} />
          Criar minha conta
        </Link>
      </Content>
    </Container>
  );
};

export default Login;
