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
      height: 90%;
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

      .room {
        background: #313131;
        border-radius: 5px;
        width: 31%;
        height: 21%;
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
`;
