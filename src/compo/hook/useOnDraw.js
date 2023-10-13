import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toolUppername } from '../../Common/tools';
import { MOUSECLICK, MOUSEDRAG } from '../../Common/mouseState';
export function useOnDraw(onDraw) {
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const prevPointRef = useRef(null);
    //clickRef
    const { tool, color } = useSelector((state) => state.canvas);
    const { coordX, coordY, src } = useSelector((state) => state.mouse);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    const mouseDownListenerRef = useRef(null); // 새로 추가된 마우스 클릭 리스너

    function setCanvasRef(ref) {
        canvasRef.current = ref;
    }

    function onCanvasMouseDown() {
        isDrawingRef.current = true;
    }

    function onCanvasMouseUp() {
        isDrawingRef.current = false;
        prevPointRef.current = null;
    }

    useEffect(() => {
        if (tool === toolUppername.CLEAR) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }, [tool]);

    useEffect(() => {
        function computePointInCanvas(clientX, clientY) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top,
                };
            } else {
                return null;
            }
        }
        if (coordX > 0 && coordY > 0) {
            const point = computePointInCanvas(coordX, coordY);
            let newImage = new Image();
            newImage.src = src;
            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(newImage, point.x, point.y);
        }
    }, [coordY]);

    useEffect(() => {
        function computePointInCanvas(clientX, clientY) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top,
                };
            } else {
                return null;
            }
        }
        function initMouseMoveListener() {
            const mouseMoveListener = (e) => {
                if (isDrawingRef.current && canvasRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;

                    // console.log(point);
                }
            };

            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener('mousemove', mouseMoveListener);
        }

        function initMouseUpListener() {
            const listener = (e) => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            };

            mouseUpListenerRef.current = listener;

            window.addEventListener('mouseup', listener);
        }

        // 새로운 마우스 클릭 리스너를  추가
        function initMouseDownListener() {
            //마우스를 땠을 때,
            const listener = (e) => {
                if (isDrawingRef.current && canvasRef.current) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;
                }
            };

            mouseDownListenerRef.current = listener;
            window.addEventListener('mousedown', listener);
        }

        function cleanup() {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener('mousemove', mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener('mouseup', mouseUpListenerRef.current);
            }
            // 마우스 클릭 리스너를 정리합니다.
            if (mouseDownListenerRef.current) {
                window.removeEventListener('mousedown', mouseDownListenerRef.current);
            }
        }

        initMouseMoveListener();
        initMouseUpListener();
        // 마우스 클릭 리스너를 초기화합니다.
        initMouseDownListener();
        return () => cleanup();
    }, [onDraw]);

    return {
        setCanvasRef,
        onCanvasMouseDown,
        onCanvasMouseUp,
    };
}

//&& (tool === toolUppername.PENCIL || tool === toolUppername.BRUSH || tool === toolUppername.ERASER)
// else if (clickRef.current && canvasRef.current && tool === toolUppername.SPOIDS) {
//     const point = computePointInCanvas(e.clientX, e.clientY);
//     const ctx = canvasRef.current.getContext('2d');
//     if (onDraw) onDraw(ctx, point, prevPointRef.current);
//     console.log('spo');
//     prevPointRef.current = point;
// }
