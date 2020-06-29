import React, { useEffect, useRef, useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { Container } from "./styles";

interface videoProps {
  peer: any;
  videoRef: any;
  controls: boolean;
}

const Video: React.FC<videoProps> = ({ peer, videoRef, controls }) => {
  const video = useRef<HTMLVideoElement>({} as any);
  const audio = useRef<HTMLAudioElement>({} as any);
  const canvas = useRef<HTMLCanvasElement>({} as any);

  const [volume, setVolume] = useState<
    number | string | Array<number | string>
  >(0.6);
  const [play, setPlay] = useState(true);
  const [showControlls, setShowControlls] = useState(false);

  const draw = useCallback((stream: any) => {
    if (canvas && canvas.current && canvas.current.getContext && stream) {
      const ctx = canvas.current.getContext("2d");
      ctx && ctx.restore();
      ctx &&
        ctx.drawImage(
          stream,
          0,
          0,
          canvas.current.width,
          canvas.current.height
        );
    }
  }, []);

  useEffect(() => {
    video.current.srcObject = null;
    video.current.autoplay = true;
    video.current.muted = true;
    video.current.id = "videoplayer";

    if (peer && video) {
      peer.peer.on("stream", (stream: any) => {
        video.current.srcObject = stream;

        audio.current.srcObject = stream;
        audio.current.volume = 0.2;
      });
    } else if (videoRef && video) {
      video.current.srcObject = videoRef;
    }

    const interval = setInterval(() => draw(video.current), 25);

    return () => {
      window.clearInterval(interval);
    };
  }, [peer, videoRef, draw]);

  const handleSliderChange = useCallback(
    (event: any, newValue: number | number[]) => {
      setVolume(newValue);
      audio.current.volume = newValue as number;
    },
    []
  );

  return (
    <Container
      className="video"
      onMouseEnter={() => setShowControlls(true)}
      onMouseLeave={() => setShowControlls(false)}
    >
      <video ref={video} />
      <canvas ref={canvas} className={!controls ? "mirror" : ""}>
        {controls ? <audio ref={audio} autoPlay /> : undefined}
      </canvas>

      {showControlls && controls ? (
        <div className="controls">
          {play ? (
            <PauseIcon
              onClick={() => {
                audio.current.pause();
                video.current.pause();
                setPlay(false);
              }}
            />
          ) : (
            <PlayArrowIcon
              onClick={() => {
                audio.current.play();
                video.current.play();
                setPlay(true);
              }}
            />
          )}

          <div>
            {volume === 0 ? (
              <VolumeOffIcon />
            ) : volume < 0.5 ? (
              <VolumeDown />
            ) : (
              <VolumeUp />
            )}

            <Slider
              style={{ width: 100, color: "darkviolet" }}
              value={typeof volume === "number" ? volume : 0}
              onChange={handleSliderChange}
              defaultValue={0.4}
              step={0.1}
              min={0.0}
              max={1.0}
              aria-labelledby="continuous-slider"
            />
          </div>
        </div>
      ) : undefined}
    </Container>
  );
};
export default Video;
