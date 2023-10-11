import styled from 'styled-components';
import { defaultColorList } from '../../Common/colors';
import { toolname } from '../../Common/tools';
import Paint from './Palette/Paint';
import Tool from './Palette/Tool';
const PaletteContainer = styled.div`
    display: flex;
`;
export default function Palette() {
    console.log(toolname);
    return (
        <>
            <PaletteContainer>
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
