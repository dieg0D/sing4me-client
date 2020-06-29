import styled from "styled-components";

export const Container = styled.div`
  .controls {
    padding: 0 0.5rem;
    width: 100%;
    height: 2.5rem;
    background-color: #000000aa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -2.75rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all 2s;
    position: relative;

    div {
      width: 35%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 0.2rem;
    }

    svg {
      font-size: 1.2rem;
      margin: 0 0.5rem;

      &:hover {
        cursor: pointer;
        color: darkviolet;
      }
    }
  }
`;
