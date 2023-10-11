import styled from 'styled-components';
import { useSelector } from 'react-redux';
const MyCanvas = styled.div`
    margin: 10px 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 70vw;
    height: 70vh;
`;

export default function Canvas() {
    const toolWithColor = useSelector((state) => state);
    console.log(toolWithColor);
    return (
        <>
            <MyCanvas>Canvas</MyCanvas>
        </>
    );
}
