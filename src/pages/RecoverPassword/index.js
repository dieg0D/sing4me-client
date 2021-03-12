import React from "react";
import Logo from "../../assets/images/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container, Content, Background } from "./styles";

const RecoverPassword = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="karaoke" />
        <form>
          <h3>Enviaremos um email com instruções de recuperação</h3>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Button>Recuperar senha</Button>
        </form>
        <Link to="login">
          <FiArrowLeft size={16} />
          Voltar ao login
        </Link>
      </Content>
    </Container>
  );
};

export default RecoverPassword;
