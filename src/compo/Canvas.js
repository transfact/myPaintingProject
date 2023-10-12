import { useOnDraw } from './hook/useOnDraw';
import { useSelector, useDispatch } from 'react-redux';
import { toolUppername } from '../Common/tools';
import { canvasAction } from '../store';
const canvasStyle = {
    //안하면 투명도를 0으로 해버리더라. 이게 맞아요 크롬님?
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    margin: '10px 10px',
};
const NewCanvas = ({ width, height }) => {
    const dispatch = useDispatch();
    const { setCanvasRef, onCanvasMouseDown, onCanvasMouseUp } = useOnDraw(onDraw);
    const { color, tool } = useSelector((state) => state.canvas);
    // console.log('tool : ', tool);
    // console.log('color : ', color);

    function onDraw(ctx, point, prevPoint) {
        switch (tool) {
            case toolUppername.PENCIL:
                drawLine(prevPoint, point, ctx, color, 3);
                break;
            case toolUppername.ERASER:
                drawLine(prevPoint, point, ctx, 'white', 10);
                break;
            case toolUppername.BRUSH:
                drawLine(prevPoint, point, ctx, color, 7);
                break;
            case toolUppername.SPOIDS:
                spoidColor(point, ctx);
                break;
            case toolUppername.BEAKER:
                fillPartial(point, ctx);
                break;
            default:
                console.log('에러', tool);
        }
    }

    function fillPartial(end, ctx) {
        //3. 플러드필 알고리즘을 활용하여 닫힌 부분을 타겟컬러로 채운다.
        function floodFill(newColor, start_x, start_y) {
            //1. 이미지의 전체를 가져오고,

            const imageData = ctx.getImageData(0, 0, width, height);
            //2. 클릭한 곳의 픽셀 컬러와 좌표를 얻는다.
            const targetColor = getPixelColor(imageData, start_x, start_y);
            console.log('targetColor:', targetColor);

            const visited = new Uint8Array(imageData.width, imageData.height);
            const stack = [{ x: start_x, y: start_y }];

            while (stack.length > 0) {
                const child = stack.pop();
                // console.log(stack.length);
                //열린 경우에는 채우지 않을 것임.
                // console.log('stack', stack.length);
                //700*500이면 stack이 35000넘기기 힘들것같은데 무한루프 방지
                //일반화하면 width * height. 좀 줄여도 될것같긴한데... 증명을 못하는 문제.
                if (!child || stack.length > width * height) {
                    return imageData;
                }
                const currentColor = getPixelColor(imageData, child.x, child.y);
                // console.log('color:', currentColor);
                if (
                    isSameColor(currentColor, targetColor) //  (3)
                ) {
                    setPixel(imageData, child.x, child.y, newColor); // (4)
                    visited[child.y * imageData.width + child.x] = 1;
                    if (!visited[child.y * imageData.width + child.x + 1]) {
                        stack.push({ x: child.x + 1, y: child.y });
                    }
                    if (!visited[child.y * imageData.width + child.x - 1]) {
                        stack.push({ x: child.x - 1, y: child.y });
                    }
                    if (!visited[(child.y + 1) * imageData.width + child.x]) {
                        stack.push({ x: child.x, y: child.y + 1 });
                    }
                    if (!visited[(child.y - 1) * imageData.width + child.x]) {
                        stack.push({ x: child.x, y: child.y - 1 });
                    }
                }
            }
            return imageData;
        }

        const convertedColor = hexToRgb(color);
        console.log('convertedColor:', convertedColor);
        const newImgData = floodFill(convertedColor, parseInt(end.x), parseInt(end.y));
        ctx.putImageData(newImgData, 0, 0);
    }

    function spoidColor(end, ctx) {
        console.log('spoid');
        const pixelRGBA = ctx.getImageData(end.x, end.y, 1, 1).data;
        const strRGBA = RGBAToHexA(`rgba(${pixelRGBA.toString()})`, true);
        dispatch(canvasAction.setColor({ color: strRGBA }));
    }

    function drawLine(start, end, ctx, color, width) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    return <canvas width={width} height={height} onMouseUp={onCanvasMouseUp} onMouseDown={onCanvasMouseDown} style={canvasStyle} ref={setCanvasRef} />;
};

export default NewCanvas;
const setPixel = (imageData, x, y, color) => {
    // console.log(x, y, color, imageData);
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset + 0] = color[0];
    imageData.data[offset + 1] = color[1];
    imageData.data[offset + 2] = color[2];
    imageData.data[offset + 3] = color[3];
};
function hexToRgb(hex, alpha = -1) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (0 <= alpha && alpha <= 1) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
        return [r, g, b, 255];
    }
}

function RGBAToHexA(rgba, forceRemoveAlpha = false) {
    return (
        '#' +
        rgba
            .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
            .split(',') // splits them at ","
            .filter((string, index) => !forceRemoveAlpha || index !== 3)
            .map((string) => parseFloat(string)) // Converts them to numbers
            .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
            .map((number) => number.toString(16)) // Converts numbers to hex
            .map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
            .join('')
    ); // Puts the array to togehter to a string
}
const isSameColor = (a, b) => {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};
const isValidSquare = (imageData, x, y) => {
    return x >= 0 && x < imageData.width && y >= 0 && y < imageData.height;
};

const getPixelOffset = (imageData, x, y) => {
    return (y * imageData.width + x) * 4;
};
const getPixelColor = (imageData, x, y) => {
    // console.log(imageData, x, y);
    if (isValidSquare(imageData, x, y)) {
        const offset = getPixelOffset(imageData, x, y);
        return imageData.data.slice(offset, offset + 4);
    } else {
        return [-1, -1, -1, -1]; // invalid color
    }
};
