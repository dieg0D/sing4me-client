import styled from "styled-components";
import { shade } from "polished";
export const Container = styled.div`
  background: #212121;
  width: 100%;
  height: 12vh;
  padding: 1rem 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 7rem;
      height: auto;

      &:hover {
        cursor: pointer;
      }
    }

    .link:first-of-type {
      margin-left: 6rem;
    }

    .link {
      color: white;
      text-decoration: none;
      margin: 0 2rem;
      transition: color 0.2s;

      &:hover {
        cursor: pointer;
        color: darkviolet;
      }
    }
  }

  .right {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 1rem;

      p:last-of-type {
        color: #dddddddd;
        padding-top: 0.5rem;
        font-size: 0.8rem;
      }
    }

    img {
      width: 9%;
      padding: 0.1rem;
      border: 2px solid darkviolet;
      border-radius: 50%;
      transition: border-color 0.2s;

      &:hover {
        cursor: pointer;
        border-color: ${shade(0.2, "darkviolet")};
      }
    }
  }

  @media (max-width: 550px) {
    padding: 1rem 1rem;
    .left {
      width: 75%;
      img {
        width: 4.5rem;
      }

      .link:first-of-type {
        margin-left: 1.5rem;
      }
      .link {
        margin: 0 0.5rem;
      }
    }

    .right {
      width: 25%;
      img {
        width: 50%;
      }
      div {
        display: none;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  background: #212121;
  height: 100vh;

  div {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    div {
      cursor: pointer;
      font-size: 14px;
      position: absolute;
      right: calc(30vw - 60%);
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 50%;
      background: darkviolet;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, "darkviolet")};
      }

      svg {
        color: white;

        background: darkviolet;
        border: none;
        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, "darkviolet")};
        }
      }
    }

    img {
      width: 20%;
      padding: 0.1rem;
      border: 2px solid darkviolet;
      border-radius: 50%;
      transition: border-color 0.2s;

      &:hover {
        cursor: pointer;
        border-color: ${shade(0.2, "darkviolet")};
      }
    }
  }
  p {
    color: white;
  }

  form {
    margin: 2rem 0 5rem 0;
    width: 80%;
    text-align: center;
    div {
      background-color: #313131;
    }
  }

  .link {
    font-size: 1.2rem;
    color: darkviolet;
    display: block;
    margin-bottom: 1.5rem;

    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      color: ${shade(0.2, "darkviolet")};
    }

    svg {
      margin-right: 10px;
    }
  }

  @media (max-width: 550px) {
    width: 75vw;
    div {
      div {
        right: calc(75vw - 65%);
      }
      img {
        width: 30%;
      }
    }
  }
`;
