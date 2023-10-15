import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 95vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
`;
const Btn = styled.button`
    position: fixed;
    width: 100px;
    background-color: transparent;
    border: none;
    z-index: 2;
    font-size: 25px;
`;

const BackGroundImg = styled.img`
    width: 50%;
    height: 100%;
    position: fixed;
    z-index: 1;
`;
export default function Main() {
    const navi = useNavigate();
    const toPaintBoardClick = () => {
        navi('/paintBoard');
    };

    return (
        <>
            <Container>
                <BackGroundImg src="./card-removebg.png"></BackGroundImg>
                <Btn style={{ top: '40%' }} onClick={toPaintBoardClick}>
                    canvas
                </Btn>
                <Btn style={{ top: '60%' }}>불러오기</Btn>
            </Container>

            {/* <Outlet /> */}
        </>
    );
}

{
    /* <a href="https://kr.freepik.com/free-vector/product-template-of-notebook-with-no-graphic_5837894.htm#query=%EB%85%B8%ED%8A%B8&position=2&from_view=keyword&track=sph">작가 brgfx</a> 출처 Freepik */
}
