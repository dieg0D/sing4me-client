import React, { useEffect, useRef, useCallback } from "react";

import { Container } from "./styles";

interface videoProps {
  stream: any;
}

const Video: React.FC<videoProps> = ({ stream }) => {
  const video = useRef<HTMLVideoElement>({} as any);

  const canvas = useRef<HTMLCanvasElement>({} as any);

  const draw = useCallback(
    (image: any) => {
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
      video.current.srcObject = stream;
      video.current.className = "EU";
      setInterval(() => draw(video.current), 25);
    }
  }, [stream, draw]);

  return (
    <Container className="video" id="my-container">
      <video ref={video} autoPlay muted />
      <canvas ref={canvas} className="mirror" />
    </Container>
  );
};
export default Video;
