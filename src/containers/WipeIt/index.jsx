import React, { useEffect, useRef } from 'react';
// import { isMobile } from '../../utils';
import girl from '../../images/girl.jpeg';
import './wipeit.css';

const WipeIt = () => {

    const canvasRef = useRef(null);
    let pos = {};
    let ctx = null;

    const drawLine = (pos, ctx) => {
        const { x, y, xEnd, yEnd } = pos
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(xEnd || x, yEnd || y)
        ctx.stroke()
    };

    const getClipArea = (e) => {
        let x = e.targetTouches[0].pageX;
        let y = e.targetTouches[0].pageY;

        return {
            x,
            y
        };
    }

    useEffect(() => {
        const canvasElm = canvasRef.current;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ctx = canvasElm.getContext('2d');
        fillImageWithCoverAndCenter(girl);

    }, []);

    const handleTouchStart = e => {
        const pos = {
            ...getClipArea(e)
        }

        drawLine(pos, ctx);
    };

    const handleTouchMove = e => {
        pos = {
            ...getClipArea(e)
        }
        const { x: xEnd, y: yEnd } = getClipArea(e)
        Object.assign(pos, { xEnd, yEnd })
        drawLine(pos, ctx)
        Object.assign(pos, { x: xEnd, y: yEnd })
    };

    const handleTouched = e => {
        console.log(e.targetTouches[0], 'end');
    };

    const fillImageWithCoverAndCenter = (src) => {
        const canvasElm = canvasRef.current;
        const img = new Image()
        img.src = src
        img.onload = () => {
            const imageAspectRatio = img.width / img.height
            const canvasAspectRatio = canvasElm.width / canvasElm.height
            // 根据图片比例和 canvas 比例的大小关系，使用不同的规则
            const imageWidth = canvasElm.height * imageAspectRatio
            const imageHeight = canvasElm.width / imageAspectRatio

            if (imageAspectRatio > canvasAspectRatio) {
                ctx.drawImage(
                    img,
                    (canvasElm.width - imageWidth) / 2,
                    0,
                    imageWidth,
                    canvasElm.height
                )
            } else {
                console.log(imageWidth, imageHeight);
                ctx.drawImage(
                    img,
                    0,
                    (canvasElm.height - imageHeight) / 2,
                    canvasElm.width,
                    imageHeight
                )
            }
            gaussBlur(canvasElm, ctx);
            // 设置一个圆形画笔
            ctx.lineCap = ctx.lineJoin = 'round'
            ctx.globalCompositeOperation = 'destination-out'
            ctx.lineWidth = 50
        }
    }

    const gaussBlur = (canvasElm, ctx) => {
        // 获取像素信息
        const imgData = ctx.getImageData(
            0,
            0,
            canvasElm.width,
            canvasElm.height
        )
        // 模糊强度
        const sigma = 10
        // 模糊半径
        const radius = 10

        const pixes = imgData.data
        const width = imgData.width
        const height = imgData.height

        const gaussMatrix = []
        const a = 1 / (Math.sqrt(2 * Math.PI) * sigma)
        const b = -1 / (2 * sigma * sigma)
        let gaussSum = 0
        // 生成高斯矩阵
        for (let i = 0, x = -radius; x <= radius; x++, i++) {
            const g = a * Math.exp(b * x * x)
            gaussMatrix[i] = g
            gaussSum += g
        }
        // 归一化, 保证高斯矩阵的值在[0,1]之间
        for (let i = 0, len = gaussMatrix.length; i < len; i++) {
            gaussMatrix[i] /= gaussSum
        }
        const B_LIST_LENGTH = 3
        // x 方向一维高斯运算
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const bList = new Array(B_LIST_LENGTH).fill(0)
                gaussSum = 0
                for (let j = -radius; j <= radius; j++) {
                    const k = x + j
                    if (k >= 0 && k < width) {
                        // 确保 k 没超出 x 的范围
                        // r,g,b,a 四个一组
                        const i = (y * width + k) * 4
                        for (let l = 0; l < bList.length; l++) {
                            bList[l] += pixes[i + l] * gaussMatrix[j + radius]
                        }
                        gaussSum += gaussMatrix[j + radius]
                    }
                }
                const i = (y * width + x) * 4
                // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
                for (let l = 0; l < bList.length; l++) {
                    pixes[i + l] = bList[l] / gaussSum
                }
            }
        }

        // y 方向一维高斯运算
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const bList = new Array(B_LIST_LENGTH).fill(0)
                gaussSum = 0
                for (let j = -radius; j <= radius; j++) {
                    const k = y + j
                    if (k >= 0 && k < height) {
                        // 确保 k 没超出 y 的范围
                        const i = (k * width + x) * 4
                        for (let l = 0; l < bList.length; l++) {
                            bList[l] += pixes[i + l] * gaussMatrix[j + radius]
                        }
                        gaussSum += gaussMatrix[j + radius]
                    }
                }
                const i = (y * width + x) * 4
                for (let l = 0; l < bList.length; l++) {
                    pixes[i + l] = bList[l] / gaussSum
                }
            }
        }

        // 填充模糊之后的图像
        ctx.putImageData(imgData, 0, 0)
    }

    return <canvas
        style={{ backgroundImage: `url(${girl})` }}
        id="canvas"
        ref={canvasRef}
        width="400"
        height="400"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouched}
    ></canvas>
};

export default WipeIt;