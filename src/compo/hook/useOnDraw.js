import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toolUppername } from '../../Common/tools';
import { mouseAction, saveAction } from '../../store';

export function useOnDraw(onDraw) {
    const dispatch = useDispatch();

    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const prevPointRef = useRef(null);
    //clickRef
    const { tool, color } = useSelector((state) => state.canvas);
    const { coordX, coordY, src } = useSelector((state) => state.mouse);
    const { myCanvas } = useSelector((state) => state.myCanvas);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    const mouseDownListenerRef = useRef(null); // 새로 추가된 마우스 클릭 리스너

    const { pic } = useSelector((state) => state.picInit);
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
        if (myCanvas) {
            const ctx = canvasRef.current;
            const image = ctx.toDataURL();
            const link = document.createElement('a');
            link.href = image;
            link.download = 'MyDesign';
            link.click();
            dispatch(saveAction.setCanvas({ myCanvas: false }));
        }
    }, [myCanvas, dispatch]);

    useEffect(() => {
        function computePointInCanvas(clientX, clientY) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                if (clientX <= canvasRef.current.width && clientY <= canvasRef.current.height) {
                    return {
                        x: clientX - boundingRect.left,
                        y: clientY - boundingRect.top,
                    };
                }
            } else {
                return null;
            }
        }
        const point = computePointInCanvas(coordX, coordY);
        if (point) {
            let newImage = new Image();
            newImage.src = src;

            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(newImage, point.x, point.y, 200, 200 * (newImage.height / newImage.width));
            setTimeout(() => {
                dispatch(mouseAction.setMouse({ coordX: -1, coordY: -1, src: '' }));
            }, 0);
        }
    }, [coordX, coordY, src, dispatch]);

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

    useEffect(() => {
        if (pic) {
            const img = new Image();
            img.src = pic;
            // console.log(img);
            const ctx = canvasRef.current.getContext('2d');
            // console.log(ctx);
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }
    }, [pic]);
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
