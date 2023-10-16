import { configureStore, createSlice } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { toolUppername } from '../Common/tools';
import { defaultColor } from '../Common/colors';

const initState = {
    color: defaultColor.black,
    tool: toolUppername.PENCIL,
    EditText: {
        coordX: -1,
        coordY: -1,
        text: '',
    },
};
//createSlice() reduce와 액션같이 생성
const canvasSlice = createSlice({
    name: 'counter',
    initialState: initState,
    reducers: {
        setColor(state, action) {
            const { color } = action.payload;
            state.color = color;
        },
        setTool(state, action) {
            const { tool } = action.payload;
            state.tool = tool;
        },
        setEditInput(state, action) {
            state.EditText = { coordX: action.payload.coordX, coordY: action.payload.coordY, text: action.payload.newInput };
        },
        setCanvasInit(state) {
            state.color = defaultColor.black;
            state.tool = toolUppername.PENCIL;
            state.EditText = { coordX: -1, coordY: -1, text: '' };
        },
    },
});

const initMouseState = {
    coordX: -1,
    coordY: -1,
    src: '',
};
//createSlice() reduce와 액션같이 생성
const mouseSlice = createSlice({
    name: 'mouseCount',
    initialState: initMouseState,
    reducers: {
        setMouse(state, action) {
            // console.log('action : ', action.payload);
            const { coordX, coordY, src } = action.payload;
            state.coordX = coordX;
            state.coordY = coordY;
            state.src = src;
        },
    },
});

const initCanvasState = {
    myCanvas: false,
};
//createSlice() reduce와 액션같이 생성
const saveSlice = createSlice({
    name: 'saveCanvas',
    initialState: initCanvasState,
    reducers: {
        setCanvas(state, action) {
            // console.log('action : ', action.payload);
            const { myCanvas } = action.payload;
            state.myCanvas = myCanvas;
        },
    },
});

const menuSlice = createSlice({
    name: 'menuSlice',
    initialState: { fileDrop: false },
    reducers: {
        setMenu(state) {
            state.fileDrop = !state.fileDrop;
        },
        setMenuInit(state) {
            state.fileDrop = false;
        },
    },
});

const initDrawSlice = createSlice({
    name: 'initDrawSlice',
    initialState: { pic: null },
    reducers: {
        setPic(state, action) {
            const pic = action.payload.pic;
            state.pic = pic;
        },
        clearPic(state) {
            state.pic = null;
        },
    },
});

const canvasStore = configureStore(
    {
        reducer: { canvas: canvasSlice.reducer, mouse: mouseSlice.reducer, myCanvas: saveSlice.reducer, dropMenu: menuSlice.reducer, picInit: initDrawSlice.reducer },
    },
    composeWithDevTools
);

export const canvasAction = canvasSlice.actions;
export const mouseAction = mouseSlice.actions;
export const saveAction = saveSlice.actions;
export const menuAction = menuSlice.actions;
export const initDrawAction = initDrawSlice.actions;
export default canvasStore;

// setGray(state) {
//     state.color = defaultColor.gray;
// },
// setRed(state) {
//     state.color = defaultColor.red;
// },
// setOrange(state) {
//     state.color = defaultColor.orange;
// },
// setYellow(state) {
//     state.color = defaultColor.yellow;
// },
// setGreen(state) {
//     state.color = defaultColor.green;
// },
// setBlue(state) {
//     state.color = defaultColor.blue;
// },
// setIndigo(state) {
//     state.color = defaultColor.indigo;
// },
// setPurple(state) {
//     state.color = defaultColor.purple;
// },
// setBlack(state) {
//     state.color = defaultColor.black;
// },
