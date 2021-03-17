import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 88vh;

  .rooms {
    background: #212121;
    border-radius: 5px;
    padding: 1rem 2rem 2rem 2rem;
    width: 65%;
    height: 85%;

    .search {
      div {
        width: 96%;
      }
      margin-left: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .container {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 1rem;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        background-color: #212121;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: #212121;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #313131;
      }

      .room {
        background: #313131;
        border-radius: 5px;
        width: 90%;
        height: 5rem;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 0.5rem;
        transition: background-color 0.2s;

        &:hover {
          cursor: pointer;
          background: ${shade(0.2, "darkviolet")};
        }

        p {
          display: flex;
          align-items: center;

          svg {
            margin-right: 10px;
          }
        }
      }

      .no-rooms {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          color: #414141;
          font-size: 2rem;
        }
        .face {
          font-size: 10rem;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .side-menu {
    width: 25%;
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .update {
      background: #212121;
      border-radius: 5px;
      padding: 2rem;
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      h2 {
        text-align: center;
      }

      div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: darkviolet;
        border-radius: 5px;
        padding: 0.5rem;
        transition: background-color 0.2s;

        &:hover {
          cursor: pointer;
          background: ${shade(0.2, "darkviolet")};
        }
      }
    }

    .wrapper {
      background: #212121;
      border-radius: 5px;
      padding: 2rem;
      width: 100%;
      height: 65%;

      form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;

        .container {
          width: 100%;

          div {
            background: #313131;
          }
        }
      }
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: flex-start;
    /* height: auto; */
    padding: 1rem;
    .rooms {
      padding: 1rem;
      width: 100%;
      margin-bottom: 1rem;
      height: 50%;

      .container {
        max-height: 75%;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0.2rem;

        .room {
          width: 90%;
          height: 4rem;
          h3 {
            font-size: 0.9rem;
          }
          p {
            margin-top: 0.2rem;
            font-size: 0.8rem;
            svg {
              width: 15px;
              height: 15px;
            }
          }
        }
        .no-rooms {
          .face {
            margin-top: 1rem;
            font-size: 3rem;
          }
          p {
            font-size: 1.3rem;
          }
        }
      }
    }

    .side-menu {
      width: 100%;
      min-height: 100%;
      .update {
        display: none;
      }
    }
  }
`;
