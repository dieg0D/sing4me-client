import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  padding: 0.5rem;
  width: 100%;
  height: 88vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .content {
      width: 73%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px 10px;
      grid-template-areas:
        ". ."
        ". .";

      .video {
        width: 100%;
        height: 100%;

        video {
          width: 0;
          height: 0;
          visibility: hidden;
        }

        canvas {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        .mirror {
          transform: scaleX(-1);
          -webkit-transform: scaleX(-1);
          -moz-transform: scaleX(-1);
        }
      }
      .myvideo {
        display: none;
      }
    }

    .menu {
      width: 25%;
      height: 100%;
      background: #212121;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 1rem 0.5rem;

      div {
        width: 100%;

        form {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.5rem 0;
          div {
            width: 85%;
            background-color: #313131;
          }
          button {
            margin-left: 0.2rem;
            background: darkviolet;
            height: 3.2rem;
            border-radius: 5px;
            border: 0;
            color: #fafafa;
            width: 15%;
            font-weight: 500;
            transition: background-color 0.2s;
            &:hover {
              background: ${shade(0.2, "darkviolet")};
            }
          }
        }
      }
      .VideoCardsContainer {
        width: 100%;
        height: 100%;
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
        .videoCard {
          display: flex;
          align-items: center;
          margin: 0.1rem 0;
          padding: 0.5rem;
          transition: background-color 0.2s;

          &:hover {
            cursor: pointer;
            background-color: #313131;
          }
          img {
            width: 6rem;
            height: auto;
          }
          div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            p {
              margin-left: 0.5rem;
              color: #dddddddd;
              font-size: 0.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* number of lines to show */
              -webkit-box-orient: vertical;
            }
            .duration {
              margin-top: 0.5rem;
              font-size: 0.6rem;
            }
          }
        }
      }

      .loader {
        width: 100%;
        min-height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////

  .wrapper2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .content {
      width: 55%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px 10px;
      grid-template-areas:
        ". ."
        ". .";

      .video {
        width: 100%;
        height: 100%;

        video {
          width: 0;
          height: 0;
          visibility: hidden;
        }

        canvas {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        .mirror {
          transform: scaleX(-1);
          -webkit-transform: scaleX(-1);
          -moz-transform: scaleX(-1);
        }
      }
      .myvideo {
        display: none;
      }
    }

    .menu {
      width: 43%;
      height: 100%;
      background: #212121;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 1rem 0.5rem;
      video {
        width: 100%;
      }

      button {
        margin-top: 7rem;
        background: darkviolet;
        height: 3.2rem;
        border-radius: 5px;
        border: 0;
        color: #fafafa;
        width: 90%;
        font-weight: 500;
        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, "darkviolet")};
        }
      }

      div {
        display: none;
        width: 100%;

        form {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.5rem 0;
          div {
            width: 85%;
            background-color: #313131;
          }
          button {
            margin-left: 0.2rem;
            background: darkviolet;
            height: 3.2rem;
            border-radius: 5px;
            border: 0;
            color: #fafafa;
            width: 15%;
            font-weight: 500;
            transition: background-color 0.2s;
            &:hover {
              background: ${shade(0.2, "darkviolet")};
            }
          }
        }
      }
      .VideoCardsContainer {
        width: 100%;
        height: 100%;
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
        .videoCard {
          display: flex;
          align-items: center;
          margin: 0.1rem 0;
          padding: 0.5rem;
          transition: background-color 0.2s;

          &:hover {
            cursor: pointer;
            background-color: #313131;
          }
          img {
            width: 6rem;
            height: auto;
          }
          div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            p {
              margin-left: 0.5rem;
              color: #dddddddd;
              font-size: 0.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* number of lines to show */
              -webkit-box-orient: vertical;
            }
            .duration {
              margin-top: 0.5rem;
              font-size: 0.6rem;
            }
          }
        }
      }

      .loader {
        width: 100%;
        min-height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
