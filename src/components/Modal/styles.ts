import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

export const Modall = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #212121;
  border-radius: 5px;
  padding: 2rem;
  width: 50%;
  height: 50%;

  p {
    display: flex;
    align-items: center;
    font-size: 1.1rem;

    svg {
      margin-right: 10px;
    }
  }

  form {
    width: 80%;
    div {
      background: #313131;
    }
  }
`;
