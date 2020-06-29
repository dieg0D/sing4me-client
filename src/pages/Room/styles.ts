import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  height: 88vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .content {
      width: 100%;
      height: 65%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .video {
        width: 50%;
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
      .menu {
        width: 45%;
        height: 100%;
        background: #212121;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem;

        div {
          width: 100%;

          h2 {
            text-align: center;
            margin-bottom: 4rem;
          }

          form {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6rem;

            div {
              width: 85%;
              background-color: #313131;
            }

            button {
              background: darkviolet;
              height: 3.2rem;
              border-radius: 5px;
              border: 0;
              padding: 0 16px;
              color: #fafafa;
              width: 10%;
              font-weight: 500;
              transition: background-color 0.2s;

              &:hover {
                background: ${shade(0.2, "darkviolet")};
              }
            }
          }
        }
        .buttons {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;

          button {
            width: 49%;
            height: 3rem;
          }

          .outline {
            background: transparent;
            color: darkviolet;
            border: 1px solid darkviolet;
            transition: background-color 0.2s;

            &:hover {
              background: #9900d322;
            }
          }
        }
      }
    }

    .row {
      background: #212121;
      padding: 1rem;
      width: 100%;
      height: 30%;
      display: flex;
      justify-content: flex-start;
      border-radius: 5px;
      .video {
        width: 20%;
        height: 100%;
        margin: 0 0.2rem;
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
    }
  }
`;
