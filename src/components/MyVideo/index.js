import React, { useEffect, useRef, useCallback } from "react";
import { Container } from "./styles";

const Video = ({ stream }) => {
  const canvas = useRef();

  const draw = useCallback(
    (image) => {
      if (canvas && canvas.current && canvas.current.getContext && image) {
        const ctx = canvas.current.getContext("2d");
        ctx && ctx.restore();
        ctx &&
          ctx.drawImage(
            image,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
      }
    },
    [canvas]
  );

  useEffect(() => {
    if (stream) {
      setInterval(() => draw(stream.current), 25);
    }
  }, [stream, draw]);

  return (
    <Container className={`video`} id="my-container">
      <video ref={stream} autoPlay muted />
      <canvas ref={canvas} className="mirror" />
    </Container>
  );
};
export default Video;
