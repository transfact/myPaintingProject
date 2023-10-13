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
            // console.log('action : ', action.payload);
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
const canvasStore = configureStore(
    {
        reducer: { canvas: canvasSlice.reducer, mouse: mouseSlice.reducer },
    },
    composeWithDevTools
);

export const canvasAction = canvasSlice.actions;
export const mouseAction = mouseSlice.actions;
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
