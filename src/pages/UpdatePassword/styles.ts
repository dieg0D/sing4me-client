import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  background: #313131;
  height: 88vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    background: #212121;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 2rem;

    img {
      width: 15%;
      padding: 0.1rem;
      border: 2px solid darkviolet;
      border-radius: 50%;
      transition: border-color 0.2s;
      margin-bottom: 1rem;

      &:hover {
        border-color: ${shade(0.2, "darkviolet")};
      }
    }

    p {
      color: white;
    }

    form {
      margin-top: 2rem;
      width: 50%;
      text-align: center;

      div {
        width: 100%;
        background-color: #313131;
      }

      button{
        margin-top: 2rem;
      }
    }
  }
`;
