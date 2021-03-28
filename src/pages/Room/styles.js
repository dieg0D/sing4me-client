import styled, { css } from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  position: absolute;
  top: 10vh;
  background-color: transparent;
  padding: 0.5rem;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .video-box {
      background: #212121;
      border-radius: 5px;
      padding: 0.5rem;
      width: 50%;
      height: 65%;
      display: flex;
      justify-content: center;
      align-items: center;

      .video {
        background: #212121;
        border-radius: 5px;
        padding: 0.5rem;
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
      }

      video {
        width: 100%;
        border-radius: 5px;
        height: auto;
      }
    }

    .content {
      /* background: #212121;
      border-radius: 5px;
      padding: 0.5rem; */
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;

      .video {
        background: #212121;
        border-radius: 5px;
        padding: 0.5rem;
        width: 49%;
        height: 48%;
        ${({ videos }) =>
          videos === 0 &&
          css`
            width: 60%;
            height: 70%;
          `}

        ${({ videos }) =>
          videos === 1 &&
          css`
            height: 60%;
          `}
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
  }

  .content2 {
    background: #212121;
    border-radius: 5px;
    padding: 0.5rem;
    width: auto;
    height: 33%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    ${({ videos }) =>
      videos === 0 &&
      css`
        grid-template-columns: 1fr;
      `}
    ${({ videos }) =>
      videos === 1 &&
      css`
        grid-template-columns: 1fr 1fr;
      `}

      ${({ videos }) =>
      videos === 2 &&
      css`
        grid-template-columns: 1fr 1fr 1fr;
      `}

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

  @media (max-width: 550px) {
    padding: 0;

    .wrapper {
      justify-content: flex-start;
      .content {
        ${({ videos }) =>
          videos === 0 &&
          css`
            display: inline-block;
          `}

        .video {
          width: 100%;
          height: 24%;
          padding: 0.3rem;

          ${({ videos }) =>
            videos === 1 &&
            css`
              height: 49%;
            `}

          ${({ videos }) =>
            videos === 2 &&
            css`
              height: 32%;
            `}

            ${({ videos }) =>
            videos === 0 &&
            css`
              height: 50%;
            `}
        }
      }

      .video-box {
        width: 100%;
        height: 37%;

        video {
          width: 100%;
        }
      }

      .content2 {
        width: 100%;
        height: 63%;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          ". ."
          ". .";

        ${({ videos }) =>
          videos === 1 &&
          css`
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas:
              ". "
              ". ";
          `}

        ${({ videos }) =>
          videos === 0 &&
          css`
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-template-areas: ". ";
          `}
      }
    }
  }
`;

export const Menu = styled.div`
  width: 30vw;
  background: #212121;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;

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

  @media (max-width: 550px) {
    width: 75vw;
    div {
      form {
        div {
          width: 80%;
        }
        button {
          width: 20%;
        }
      }
    }
  }
`;
