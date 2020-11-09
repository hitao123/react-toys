import React, { useState, useEffect, useRef } from 'react';
import { PlayListConfig } from '../../config';
import { Visualizer } from '../../lib/visualizer';
import '../../styles/music.css';
import errCover from '../../images/defaultCover.jpg';

// one 单曲 random 随机 order 顺序
const patternArr = ['one', 'random', 'order'];

const MusicComponent = () => {

    const audioRef = useRef(null);
    const volumeRef = useRef(null);
    const progressRef = useRef(null);
    const canvasRef = useRef(null);

    const [title, setTitle] = useState(PlayListConfig[0].title);
    const [singer, setSinger] = useState(PlayListConfig[0].artist);
    const [cover, setCover] = useState(PlayListConfig[0].picture);
    const [song, setSong] = useState({});
    let [playIndex, setPlayIndex] = useState(0);
    const [time, setTime] = useState('');
    const [model, setModel] = useState('order'); // 设置模式
    const [progressWidth, setProgressWidth] = useState(0); // 设置进度条
    const [playing, setPlaying] = useState(false); // 播放状态
    const [duration, setDuration] = useState(1);

    const handlePlayList = index => {
        const songObject = PlayListConfig[index] || {};
        setSong(songObject)
        setPlayIndex(index);
        setTitle(songObject.title);
        setSinger(songObject.artist);
        setCover(songObject.picture);
        if (audioRef.current) {
            audioRef.current.src = songObject.url;
            audioRef.current.play()
                .then(() => {
                    setPlaying(true);
                })
                .catch(err => {
                    console.log(err);
                    setTitle('抱歉，没找到资源，请聆听其他歌曲😊')
                });
        }
    };

    const handlePlay = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
                setPlaying(false);
            } else {
                handlePlayList(0);
            }
        }
    };

    /**
     * 时间进度显示，数字以及进度条
     */
    const progress = () => {
        if (audioRef.current) {
            let time = parseInt(song.length - audioRef.current.currentTime);
            let minute = parseInt(time / 60);
            let second = parseInt(time % 60);

            let totalMin = parseInt(song.length / 60);
            let totalSed = parseInt(song.length % 60);

            if (second < 10) {
                second = '0' + second;
            }

            setTime(`${minute}:${second} / ${totalMin}:${totalSed}`);
            setProgressWidth((audioRef.current.currentTime / song.length) * 100 + '%');
        }
    }
    /**
     * 点击快进歌曲
     */
    const setProgress = e => {
        // 当前歌曲时间 = 点击位置所占比例 x 总时间
        if (audioRef.current && progressRef.current) {
            audioRef.current.currentTime = (e.nativeEvent.offsetX / progressRef.current.clientWidth) * duration;
        }
    }
    /**
     * 声音控制
     */
    const setVolume = e => {
        if (volumeRef.current) {
            const rect = volumeRef.current.getBoundingClientRect();
            //这里需要多减去一个声音 icon 的宽度
            let volume = (e.nativeEvent.x - rect.left) / e.target.clientWidth;

            //限制范围 [0,1]
            if (volume < 0) {
                volume = 0;
            }
            if (volume > 1) {
                volume = 1;
            }
            if (volume >= 0 && volume <= 1) {
                volumeRef.current.style.width = volume * 100 + '%';
                audioRef.current.volume = volume;
            }
        }
    }

    const generatePattern = () => {
        const pattern = patternArr[Math.ceil(Math.random() * 3)];
        switch (pattern) {
            case 'order':
                setModel('order');
                return '循环';
            case 'one':
                setModel('one');
                return '单曲';
            case 'random':
                setModel('random');
                return '随机';
            default:
                setModel('order');
                return '循环';
        }
    }

    const handleImageLoadError = () => {
        setCover(errCover);
    }

    const prev = () => {
        playIndex--;
        if (playIndex < 0) {
            playIndex = PlayListConfig.length - 1;
        }
        setPlayIndex(playIndex);
        handlePlayList(playIndex);
    };

    const next = () => {
        playIndex++;
        if (playIndex > PlayListConfig.length - 1) {
            playIndex = 0;
        }
        setPlayIndex(playIndex);
        handlePlayList(playIndex);
    }

    const oneLoop = () => {
        handlePlayList(playIndex);
    }

    const randLoop = () => {
        const len = PlayListConfig.length;
        const random = Math.floor(Math.random() * len);
        playIndex = random;
        setPlayIndex(playIndex);
        handlePlayList(playIndex);
    }

    const handleDownload = () => {
        window.location.href = PlayListConfig[playIndex].url;
    };

    /**
     * 播放模式
     */
    const playPattern = () => {
        switch (model) {
            case 'order':
                next();
                break;
            case 'one':
                oneLoop();
                break;
            case 'random':
                randLoop();
                break;
            default:
                next();
                break;
        }
    }

    const handleClick = () => {
        window.open('https://baidu.com', "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
    }

    useEffect(() => {
        audioRef.current.addEventListener("canplay", () => {
            const duration = parseInt(audioRef.current.duration);
            setDuration(duration);
        });
        audioRef.current.addEventListener('timeupdate', progress);
        audioRef.current.addEventListener('ended', playPattern);
        document.title = 'music player';
        return () => {
            audioRef.current.removeEventListener('timeupdate', progress);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            audioRef.current.removeEventListener('ended', playPattern);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [song, model, playIndex]);

    useEffect(() => {
        const visualizerObj = new Visualizer('visualizer', audioRef.current);
        // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
        // 必须要有用户通过手势启动
        document.querySelectorAll('.playlist-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                visualizerObj.audioCtx.resume().then(() => {
                    console.log('Playback resumed successfully');
                });
            });
        });
        document.querySelector('.fa-play').addEventListener('click', () => {
            visualizerObj.audioCtx.resume().then(() => {
                console.log('Playback resumed successfully');
            });
        });
    }, []);

    return (
        <div className="music-container">
            <div className="playlist">
                {
                    PlayListConfig.map((item, index) => {
                        return (
                            <div
                                className={`playlist-item ${playIndex === index ? 'active' : ''}`}
                                key={index}
                                onClick={() => handlePlayList(index)}
                            >
                                {`${index + 1}. ${item.title} ${item.artist}`}
                            </div>
                        )
                    })
                }
            </div>
            <div className="player-box">
                <audio id="audio" ref={audioRef}></audio>
                <div className="title">{title}</div>
                <div className="singer">{singer}</div>
                <div className="time-box">
                    <span className="time">{time}</span>
                    <span className="volume">
                        <i className="fa fa-volume-up icon"></i>
                        <div className="volume-slider" onClick={setVolume}>
                            <div className="volume-slider-value" ref={volumeRef}></div>
                        </div>
                    </span>
                    <span className="pattern">
                        <i className="desc">{model}</i>
                        <i className="fa fa-random icon" onClick={generatePattern}></i>
                    </span>
                </div>
                <div className="player-progress">
                    <div className="progress-slider" ref={progressRef} onClick={setProgress}>
                        <div
                            className="progress-slider-value"
                            style={{ width: progressWidth }}
                        >
                        </div>
                    </div>
                </div>
                <div className="operation">
                    <i className="fa fa-heart icon" onClick={handleClick}></i>
                    <i className="fa fa-download icon" onClick={handleDownload}></i>
                    <div className="right">
                        <i className="fa fa-step-backward icon" onClick={prev}></i>
                        <i
                            className={`fa icon ${playing ? 'fa-pause' : 'fa-play'}`}
                            onClick={handlePlay}
                        ></i>
                        <i className="fa fa-step-forward icon" onClick={next}></i>
                    </div>
                </div>
                <div className="music-dance">
                    <canvas id="visualizer" ref={canvasRef} className="visualizer" width="600" height="300"></canvas>
                </div>
            </div>
            <div className="play-cover">
                <img src={cover} alt="专辑" onError={handleImageLoadError} />
            </div>
        </div>
    );
};

export default MusicComponent;
