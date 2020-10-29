import React, { useState, useEffect, useRef } from 'react';
import {playlist} from '../../config';
import '../../styles/music.css';
import errCover from '../../images/defaultCover.jpg';

// one 单曲 random 随机 order 顺序
const patternArr = ['one', 'random', 'order'];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000","#34B2A5","#E32555","#F3C5D5"]; //颜色数组
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const MusicComponent = () => {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //用来获取音频时间和频率数据
    const analyser = audioCtx.createAnalyser();

    const audioRef = useRef(null);
    const volumeRef = useRef(null);
    const progressRef = useRef(null);
    const canvasRef = useRef(null);

    const [title, setTitle] = useState(playlist[0].title);
    const [singer, setSinger] = useState(playlist[0].artist);
    const [cover, setCover] = useState(playlist[0].picture);
    const [song, setSong] = useState({});
    let [playIndex, setPlayIndex] = useState(0);
    const [time, setTime] = useState('');
    const [model, setModel] = useState('order'); // 设置模式
    const [progressWidth, setProgressWidth] = useState(0); // 设置进度条
    const [playing, setPlaying] = useState(false); // 播放状态
    const [duration, setDuration] = useState(1);

    const handlePlayList = index => {
        const songObject = playlist[index] || {};
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
                audioRef.current.play().then(() => {
                    setPlaying(true);
                })
                .catch(err => {
                    console.log(err);
                    setTitle('抱歉，没找到资源，请聆听其他歌曲😊')
                });;
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
    
            if(second < 10) {
                second = '0' + second;
            }
    
            setTime(`${minute}:${second} / ${totalMin}:${totalSed}`);
            setProgressWidth((audioRef.current.currentTime / song.length)* 100 + '%');
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
            console.log(rect, e.nativeEvent.x, volume);

            //限制范围 [0,1]
            if(volume < 0) {
                volume = 0;
            }
            if(volume > 1) {
                volume = 1;
            }
            if(volume >= 0 && volume <= 1) {
                volumeRef.current.style.width = volume * 100 + '%';
                audioRef.current.volume = volume;
            }
        }
    }

    const generatePattern = () => {
        const pattern = patternArr[Math.ceil(Math.random() * 3)];
        switch(pattern) {
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
        if(playIndex < 0) {
            playIndex = playlist.length - 1;
        }
        setPlayIndex(playIndex);
        handlePlayList(playIndex);
    };

    const next = () => {
        playIndex++;
        if(playIndex > playlist.length - 1) {
            playIndex = 0;
        }
        setPlayIndex(playIndex);
        handlePlayList(playIndex);
    }

    const oneLoop = () => {
        handlePlayList(playIndex);
    }

    const randLoop = () => {
        const len = playlist.length;
		const random = Math.floor(Math.random() * len);
        playIndex = random;
        setPlayIndex(playIndex);
        handlePlayList(playIndex);
    }

    const handleDownload = () => {
        window.location.href = playlist[playIndex].url;
    };

    /**
     * 播放模式
     */
    const playPattern = () => {
            switch(model) {
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

    const draw = () => {
        const canvas = document.getElementById('visualizer');
        const ctx = canvas.getContext('2d');

        requestAnimationFrame(draw);
        // CROS 不发送cookie
		audioRef.current.crossOrigin = 'anonymous';
		//将前面的audio进行处理
		const audioSrc = audioCtx.createMediaElementSource(audioRef.current);
		//输出到系统扬声器
		audioSrc.connect(analyser);
		analyser.connect(audioCtx.destination);
		//创建一个8位无符号整型数组，存储频率信息, 长度 1024
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
		//将当前频率数据复制到传入Uint8Array数组中
		analyser.getByteFrequencyData(frequencyData);
		// fftSize 属性的值必须是从32到32768范围内的2的非零幂; 
		// 其默认值为2048 用于确定频域 取低频数据 
		const length = Math.ceil(analyser.fftSize / 3);
		//等分 width
	    const width = canvas.width / length - 0.5;
	    //清除画布内容
	    ctx.clearRect(0, 0, canvas.width, canvas.height)
	    for (let i = 0; i < length; i += 1) {
	      ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
	      ctx.fillRect(i * (width + 0.5), canvas.height - frequencyData[i], width, frequencyData[i]);
	    }
    }



    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("canplay", () => {
                draw();
                const duration = parseInt(audioRef.current.duration);
                setDuration(duration);
            });
            audioRef.current.addEventListener('timeupdate', progress);
            audioRef.current.addEventListener('ended', playPattern);
            return () => {
                audioRef.current.removeEventListener('timeupdate', progress);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                audioRef.current.removeEventListener('ended', playPattern);
            };
        }
        document.title = 'music player';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [song, model, playIndex])

    return (
        <div className="music-container">
            <div className="playlist">
                {
                    playlist.map((item, index) => {
                        return (
                            <div 
                                className={`playlist-item ${playIndex === index ? 'active' : ''}`}
                                key={index}
                                onClick={() => handlePlayList(index)}
                            >
                                {`${index+1}. ${item.title} ${item.artist}`}
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
                            style={{width: progressWidth}}
                            >
                        </div>
                    </div>
                </div>
                <div className="operation">
                    <i className="fa fa-heart icon"></i>
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
