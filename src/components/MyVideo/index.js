import React, { useEffect, useRef, useCallback } from "react";
import { FaCrown } from "react-icons/fa";
import { Container } from "./styles";

const Video = ({ stream, active }) => {
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
    <Container className={`video ${active ? "active" : ""}`} id="my-container">
      <FaCrown size={50} className="crown" />
      <video ref={stream} autoPlay muted />
      <canvas ref={canvas} className="mirror" />
    </Container>
  );
};
export default Video;
