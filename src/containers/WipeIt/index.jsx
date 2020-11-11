import React, { useEffect, useRef } from 'react';


const WipeIt = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm.getContext('2d')
        // canvas 填充满蓝色
        ctx.rect(0, 0, canvasElm.clientWidth / 2, canvasElm.clientHeight / 2)
        ctx.fillStyle = 'blue'
        ctx.fill()

        // 设置一个圆形画笔
        ctx.lineCap = ctx.lineJoin = 'round'
        ctx.lineWidth = 50

        // 定位 canvas 正中央
        const x = canvasElm.clientWidth / 2
        const y = canvasElm.clientHeight / 2

        // 画一笔，并设置颜色为红色
        ctx.strokeStyle = 'red'
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y)
        ctx.stroke()
    }, []);

    return <canvas id="canvas" ref={canvasRef} width="400" height="400"></canvas>
};

export default WipeIt;