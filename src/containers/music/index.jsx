import React, { useState, useEffect } from 'react';
import {playlist} from '../../config';
import {Visualizer} from '../../lib/visualizer';
import '../../styles/music.css';

// one 单曲 random 随机 order 顺序
const patternArr = ['one', 'random', 'order'];

const MusicComponent = () => {

    const audio = new Audio();

    const [title, setTitle] = useState(playlist[0].title);
    const [singer, setSinger] = useState(playlist[0].artist);
    const [song, setSong] = useState({});
    const [playIndex, setPlayIndex] = useState(0);
    const [time, setTime] = useState('');
    const [model, setModel] = useState('order'); // 设置模式
    const [progressWidth, setProgressWidth] = useState(0); // 设置进度条

    const handlePlayList = index => {
        const songObject = playlist[index] || {};
        setSong(songObject)
        setPlayIndex(index);
        setTitle(songObject.title);
        setSinger(songObject.artist);
        audio.src = songObject.url;
        audio.play().catch(err => {
            console.log(err);
            setTitle('抱歉，没找到资源，请聆听其他歌曲😊')
        });
    };

    /**
     * 时间进度显示，数字以及进度条
     */
    const progress = () => {
        console.log(song, song.length, audio.currentTime, '??')
        let time = parseInt(song.length - audio.currentTime);
        let minute = parseInt(time / 60);
        let second = parseInt(time % 60);

        if(second < 10) {
            second = '0' + second;
        }

        setTime(`-${minute}:${second}`);
        console.log(`-${minute}:${second}`);
        setProgressWidth((audio.currentTime / song.length)* 100 + '%');
    }
    // /**
    //  * 点击快进歌曲
    //  */
    // const setProgress = () => {
    //     //当前歌曲时间 = 点击位置所占比例 x 总时间
    //     this.audio.currentTime = e.offsetX / this.$progress.clientWidth * this.audio.duration;
    //     this.play();	
    // }
    // /**
    //  * 声音控制
    //  */
    // const setVolume = (e) => {
    //     const rect = this.$volume.getBoundingClientRect();
    //     //这里需要多减去一个声音 icon 的宽度
    //     let volume = (e.x - rect.left - 15) / this.$volumeSlider.clientWidth;
    //     //限制范围 [0,1]
    //     if(volume < 0) {
    //         volume = 0;
    //     }
    //     if(volume > 1) {
    //         volume = 1;
    //     }
    //     if(volume >= 0 && volume <= 1) {
    //         this.$volumeValue.style.width = volume * 100 + '%';
    //         this.audio.volume = volume;
    //     }
    // }

    const generatePattern = () => {
        const pattern = patternArr[Math.ceil(Math.random(0, patternArr.length) * 3)];

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

    const next = () => {}

    const oneLoop = () => {}

    const randLoop = () => {}

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

    useEffect(() => {

        new Visualizer('visualizer', audio);
        
        audio.addEventListener('timeupdate', progress);
        audio.addEventListener('ended', playPattern);
        return () => {
            audio.removeEventListener('timeupdate', progress);
            audio.removeEventListener('ended', playPattern);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [song, model, playIndex])

    return (
        <div className="music-container">
            <div className="playlist">
                {
                    playlist.map((item, index) => {
                        return (
                            <div 
                                className="playlist-item"
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
                <div className="title">{title}</div>
                <div className="singer">{singer}</div>
                <div className="time-box">
                <span className="time">{time}</span>
				<span className="volume">
					<i className="fa fa-volume-up icon"></i>
					<span className="volume-slider">
						<i className="volume-slider-value"></i>
					</span>
				</span>
                    <span className="pattern">
                        <i className="desc">{}</i>
                        <i className="fa fa-random icon"></i>
                    </span>
                </div>
                <div className="progress">
                    <div className="progress-slider">
                        <div className="progress-slider-value" style={{width: progressWidth}}></div>
                    </div>
                </div>
                <div className="operation">
                    <i className="fa fa-heart icon"></i>
                    <i className="fa fa-trash icon"></i>
                    <div className="right">
                        <i className="fa fa-step-backward icon"></i>
                        <i className="fa fa-play icon"></i>
                        <i className="fa fa-pause icon" style={{"display": "none"}}></i>
                        <i className="fa fa-step-forward icon"></i>
                    </div>
			    </div>
                <div className="music-dance">
                    <canvas id="visualizer" className="visualizer" width="600" height="300"></canvas>
                </div>
            </div>
            <div className="play-cover">
                <img src="https://img3.doubanio.com/img/fmadmin/large/908330.jpg" alt="专辑" />
            </div>
        </div>
    );
};

export default MusicComponent;
