import styled, { css , } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #212121;
  border-radius: 5px;
  padding: 16px;
  width: 100%;
  border: 2px solid #212121;
  color: #777;
  display: flex;
  align-items: center;

  transition: color 0.2s;
  transition: border-color 0.2s;
  
  & + div {
    margin-top: 8px;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: darkviolet;
      border-color: darkviolet;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: darkviolet;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #777;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
