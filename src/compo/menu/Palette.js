import styled from 'styled-components';
import { defaultColorList } from '../../Common/colors';
import { toolname } from '../../Common/tools';
import Paint from './Palette/Paint';
import Tool from './Palette/Tool';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { canvasAction } from '../../store';
const PaletteContainer = styled.div`
    margin: 5px 0px;
    padding-bottom: 5px;
    display: flex;
`;

const ColorBox = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 3px;
    background-color: rgba(${(props) => props.colorR}, ${(props) => props.colorG}, ${(props) => props.colorB}, ${(props) => props.colorA});
    &:hover {
        cursor: pointer;
    }
`;

export default function Palette() {
    const dispatch = useDispatch();
    const [myColor, setMyColor] = useState({
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },
    });
    function handleChange(color) {
        // console.log(color.rgb);
        setMyColor({ ...myColor, color: color.rgb });
    }
    function setGlobalColor() {
        if (myColor.displayColorPicker) {
            const R = myColor.color.r.toString(16);
            const G = myColor.color.g.toString(16);
            const B = myColor.color.b.toString(16);
            const A = parseInt(myColor.color.a * 255).toString(16);
            const hex = '#' + R + G + B + A;
            dispatch(canvasAction.setColor({ color: hex }));
        }
        setMyColor({ ...myColor, displayColorPicker: !myColor.displayColorPicker });
    }
    // console.log(toolname);
    return (
        <>
            <PaletteContainer>
                <ColorBox colorR={myColor.color.r} colorG={myColor.color.g} colorB={myColor.color.b} colorA={myColor.color.a} onClick={setGlobalColor} />
                {myColor.displayColorPicker ? <SketchPicker color={myColor.color} onChange={handleChange}></SketchPicker> : null}

                {defaultColorList.map((color) => {
                    return <Paint color={color} key={color}></Paint>;
                })}
                {toolname.map((tool) => {
                    return <Tool tool={tool} key={tool}></Tool>;
                })}
            </PaletteContainer>
        </>
    );
}
