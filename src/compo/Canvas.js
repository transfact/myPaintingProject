import styled from 'styled-components';
const MyCanvas = styled.div`
    margin: 10px 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 70vw;
    height: 70vh;
`;

export default function Canvas() {
    return (
        <>
            <MyCanvas>Canvas</MyCanvas>
        </>
    );
}
