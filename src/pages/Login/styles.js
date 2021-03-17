import styled from "styled-components";
import singer from "../../assets/images/singer.jpg";

import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 650px;

  img {
    width: 40%;
    height: auto;
    object-fit: cover;
    object-position: top;
  }

  form {
    margin: 80px 0;
    width: 50%;
    text-align: center;

    h2 {
      margin-bottom: 24px;
    }

    a {
      color: #fafafa;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#fafafa")};
      }
    }
  }

  > a {
    color: darkviolet;
    display: block;

    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, "darkviolet")};
    }

    svg {
      margin-right: 10px;
    }
  }

  @media (max-width: 550px) {
    img {
      width: 50%;
    }
    form {
      width: 80%;
      margin: 50px 0;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${singer}) no-repeat center;
  background-size: cover;
  background-blend-mode: luminosity;
`;
