import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "./styles";

const Button = ({ children, loading = false, ...rest }) => (
  <Container {...rest}>
    {loading ? (
      <CircularProgress size={25} style={{ color: "white" }} />
    ) : (
      children
    )}
  </Container>
);

export default Button;
