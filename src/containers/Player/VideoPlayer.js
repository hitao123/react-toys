import React, { useState, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import {ButtonGroup, Button, ProgressBar} from 'react-bootstrap';
import screenfull from 'screenfull';

import Duration from '../../components/Duration';


const Player = () => {
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [seeking, setSeeking] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [pip, setPip] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [duration, setDuration] = useState(0);

    const videoRef = useRef(null);

    // useEffect(() => {
    //   console.log(videoRef);
    //   console.log(findDOMNode(videoRef.current))
    // }, []);

    const onPlay = () => {
      console.log('onPlay')
      setPlaying(true);
    }

    const onPause = () => {
      console.log('onPause')
      setPlaying(false);
    }

    const onBuffer = () => {
      console.log('onBuffer')
    }

    const onSeek = () => {
      console.log('onSeek')
    }

    const onClickFullscreen = () => {
      screenfull.request(findDOMNode(videoRef.current))
    }

    const onMute = () => {
      setMuted(!muted)
    }

    const onPip = () => {
      setPip(!pip);
    }

    const handleSetPlaybackRate = e => {
      setPlaybackRate(parseFloat(e.target.value));
    }

    const handleVolumClick = e => {
      setVolume(parseFloat(e.target.value))
    }

    const handleSeekMouseDown = e => {
      setSeeking(true);
    }
  
    const handleSeekChange = e => {
      setPlayed(parseFloat(e.target.value));
    }
  
    const handleSeekMouseUp = e => {
      setSeeking(false);
      videoRef.current.seekTo(parseFloat(e.target.value))
    }

    const handleDuration = duration => {
      // console.log(duration);
      setDuration(duration);
    }

    const handleProgress = state => {
      const {played} = state;
      setPlayed(played);
    }

    return (
      <div className="player-warper">
        <ReactPlayer
          url='http://fuwu.gz.bcebos.com/%E4%BC%B4%E9%B1%BC%E7%BB%98%E6%9C%AC%E5%88%9B%E6%84%8F%E5%AE%9A%E5%88%B6%E8%A7%86%E9%A2%91%402x.mp4?authorization=bce-auth-v1%2F43a1896b2d6d46b5a6cbbe2da2699dfc%2F2019-11-28T08%3A35%3A46Z%2F300%2Fhost%2Fd31c736591d63ac0396eea17c11428ca9e50c5672deb9879fb3559c944ab675d&process=none'
          playing={playing}
          playsinline
          pip={pip}
          playbackRate={playbackRate}
          onPlay={onPlay}
          volume={volume}
          onPause={onPause}
          onBuffer={onBuffer}
          onSeek={onSeek}
          ref={videoRef}
          width={600}
          muted={muted}
          onDuration={handleDuration}
          onProgress={handleProgress}
        />
        <div className="control">
          <div>基本功能</div>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={onPlay}>播放</Button>
            <Button variant="secondary" onClick={onPause}>暂停</Button>
            <Button variant="secondary" onClick={onClickFullscreen}>全屏</Button>
            <Button variant="secondary" onClick={onMute}>静音</Button>
            <Button variant="secondary" onClick={onPip}>画中画</Button>
          </ButtonGroup>
        </div>
        <div className="control">
          <div>倍数</div>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={handleSetPlaybackRate} value="1">1x</Button>
            <Button variant="secondary" onClick={handleSetPlaybackRate} value="1.5">1.5x</Button>
            <Button variant="secondary" onClick={handleSetPlaybackRate} value="2">2x</Button>
          </ButtonGroup>
        </div>
        <div className="control">
          <label>播放进度（可快进、快退）</label>
          <input 
            type="range" min={0} max={1} step="any" value={played}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleSeekChange}
          />
          <ProgressBar now={played * 100} />
        </div>
        <div className="control">
          <label>声音调节</label>
          <input 
            type="range" min={0} max={1} step="any" value={volume}
            onChange={handleVolumClick}
          />
          <ProgressBar now={volume * 100} />
        </div>
        <div className="control">
          <Duration seconds={duration * (1 - played)} />
          <span>/</span>
          <Duration seconds={duration} />
        </div>
      </div>
    );
}

export default Player;
