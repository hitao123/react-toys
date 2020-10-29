/**
 * 音频可视化模块
 */

export class Visualizer {

    constructor(selector, audio) {
		this.canvas = document.getElementById(selector);
		this.ctx = this.canvas.getContext('2d');
		// CROS 不发送cookie
		audio.crossOrigin = 'anonymous';
		//兼容性写法
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		//用来获取音频时间和频率数据
		this.analyser = this.audioCtx.createAnalyser();
		//将前面的audio进行处理
		this.audioSrc = this.audioCtx.createMediaElementSource(audio);
		//输出到系统扬声器
		this.audioSrc.connect(this.analyser);
		this.analyser.connect(this.audioCtx.destination);
		//创建一个8位无符号整型数组，存储频率信息, 长度 1024
		this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
		this.draw();
    }

    draw() {
		const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000","#34B2A5","#E32555","#F3C5D5"]; //颜色数组
		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		requestAnimationFrame(this.draw.bind(this));
		//将当前频率数据复制到传入Uint8Array数组中
		this.analyser.getByteFrequencyData(this.frequencyData);
		// fftSize 属性的值必须是从32到32768范围内的2的非零幂; 
		// 其默认值为2048 用于确定频域 取低频数据 
		const length = Math.ceil(this.analyser.fftSize / 3);
		//等分 width
	    const width = this.canvas.width / length - 0.5;
	    //清除画布内容
	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	    for (let i = 0; i < length; i += 1) {
	      this.ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
	      this.ctx.fillRect(i * (width + 0.5), this.canvas.height - this.frequencyData[i], width, this.frequencyData[i]);
	    }
    }
}
