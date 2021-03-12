import styled from "styled-components";

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
      width: 75%;
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
    }
    .menu {
      background: #212121;
      width: 22%;
      height: 100%;
      border-radius: 5px;

      padding: 0.5rem 1rem;
    }
  }
`;
