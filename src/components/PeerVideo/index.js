import React, { useEffect, useRef, useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { Container } from "./styles";

const Video = ({ peer }) => {
  const video = useRef();
  const audio = useRef();
  const canvas = useRef();

  const [volume, setVolume] = useState(0.6);
  const [play, setPlay] = useState(true);
  const [showControlls, setShowControlls] = useState(false);

  const draw = useCallback((stream) => {
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
    peer.on("stream", (stream) => {
      video.current.srcObject = stream;
      video.current.className = "Peer";
      audio.current.srcObject = stream;
      audio.current.volume = 0.2;
      setInterval(() => draw(video.current), 25);
    });
  }, [peer, draw]);

  const handleSliderChange = useCallback((event, newValue) => {
    setVolume(newValue);
    audio.current.volume = newValue;
  }, []);

  const mute = useCallback(() => {
    setVolume(0);
    audio.current.volume = 0;
  }, []);

  return (
    <Container
      className={`video`}
      id="container"
      onMouseEnter={() => setShowControlls(true)}
      onMouseLeave={() => setShowControlls(false)}
    >
      <video ref={video} autoPlay muted />
      <canvas ref={canvas}>
        <audio ref={audio} autoPlay />
      </canvas>

      {showControlls ? (
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
              <VolumeOffIcon onClick={() => mute()} />
            ) : volume < 0.5 ? (
              <VolumeDown onClick={() => mute()} />
            ) : (
              <VolumeUp onClick={() => mute()} />
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
