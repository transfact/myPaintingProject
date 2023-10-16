import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { menuAction, canvasAction, initDrawAction } from '../store/index';

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
    &:hover {
        cursor: pointer;
    }
`;

const DivButton = styled.div`
    background-color: transparent;
    text-align: center;
    color: black;
    border: none;
    font-size: 25px;
    cursor: pointer;
    &:hover {
        cursor: pointer;
    }
`;

const BackGroundImg = styled.img`
    width: 50%;
    height: 100%;
    position: fixed;
    z-index: 1;
`;
export default function Main() {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const toPaintBoardClick = () => {
        navi('/paintBoard');
        dispatch(menuAction.setMenuInit());
        dispatch(canvasAction.setCanvasInit());
        dispatch(initDrawAction.clearPic());
    };
    function imgInit(e) {
        const imgFile = e.target.files[0];

        if (imgFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                navi('/paintBoard');
                const imgData = e.target.result;
                dispatch(menuAction.setMenuInit());

                dispatch(initDrawAction.setPic({ pic: imgData }));
            };

            reader.readAsDataURL(imgFile);
        }
    }
    return (
        <Container>
            <BackGroundImg src="./card-removebg.png"></BackGroundImg>
            <Btn style={{ top: '40%' }} onClick={toPaintBoardClick}>
                canvas
            </Btn>
            <div style={{ position: 'fixed', top: '60%', width: '100px', zIndex: 3 }}>
                <input
                    type="file"
                    id="file"
                    style={{ display: 'none' }}
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    name="profile_img"
                    onChange={imgInit}
                    onClick={(e) => {
                        e.target.value = null;
                    }}
                />
                <label htmlFor="file">
                    <DivButton>불러오기</DivButton>
                </label>
            </div>
        </Container>
    );
}

{
    /* <a href="https://kr.freepik.com/free-vector/product-template-of-notebook-with-no-graphic_5837894.htm#query=%EB%85%B8%ED%8A%B8&position=2&from_view=keyword&track=sph">작가 brgfx</a> 출처 Freepik */
}
