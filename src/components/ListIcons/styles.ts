import styled, { css } from "styled-components";
import { shade } from "polished";

interface ImgProps {
  active: boolean;
  display: boolean;
}

export const Container = styled.div`
  background: #212121;
  width: 30vw;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 25%;

    h2 {
      color: white;
      padding-left: calc(30vh - 30%);
    }

    svg {
      color: white;
      transition: color 0.2s;

      border: none;
      &:hover {
        cursor: pointer;
        border-radius: 50%;
        color: ${shade(0.2, "darkviolet")};
      }
    }
  }

  .container {
    width: 100%;
    min-height: 95%;
    display: flex;
    flex-wrap: wrap;
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

    .loader {
      width: 100%;
      min-height: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Img = styled.img<ImgProps>`
  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}

  width: 25%;
  padding: 0.1rem;
  border: 2px solid #313131;
  border-radius: 50%;
  margin: 1rem;
  transition: border-color 0.2s;
  ${({ active }) =>
    active &&
    css`
      border-color: darkviolet;
    `}

  &:hover {
    cursor: pointer;
    border-color: ${shade(0.2, "darkviolet")};
  }
`;
