import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
`;
const Btn = styled.button`
    width: 100px;
`;

export default function Main() {
    const navi = useNavigate();
    const toPaintBoardClick = () => {
        navi('/paintBoard');
    };

    return (
        <>
            <Container>
                <Btn onClick={toPaintBoardClick}>canvas</Btn>
                <Btn>불러오기</Btn>
            </Container>

            {/* <Outlet /> */}
        </>
    );
}
