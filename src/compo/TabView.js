import { useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import DefaultImg from './TabView/DefaultImg';
import ImgUpload from './TabView/ImgUpload';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { mouseAction } from '../store/index';

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
`;

const TabBtn = styled.button``;
const TabDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const TabGrid = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    grid-template-rows: repeat(3, minmax(auto, auto)); /* 2개의 행을 생성합니다. */
    grid-template-columns: repeat(2, minmax(100px, auto)); /* 3개의 열을 생성합니다. */
    gap: 10px; /* 그리드 아이템 사이의 간격을 조절합니다. 원하는 간격으로 조정하세요. */
`;
const imgSource = ['Circle.png', 'Square.png', 'Uarrow.png', 'Darrow.png', 'Rarrow.png', 'Larrow.png'];
export default function TabView(props) {
    const [tab, setTab] = useState(0);
    const { coordX, coordY, src } = useSelector((state) => state.mouse);
    const dispatch = useDispatch();

    return (
        <TabContainer style={{ width: props.width, height: props.height }}>
            <TabDiv>
                <TabBtn onClick={() => setTab(0)}>Default</TabBtn>
                <TabBtn onClick={() => setTab(1)}>Upload</TabBtn>
            </TabDiv>
            {tab == 0 ? (
                <TabGrid>
                    {imgSource.map((img) => {
                        return (
                            <div style={{ position: 'relative' }}>
                                <Draggable
                                    onStart={(e) => {
                                        if (coordX == -1) {
                                            dispatch(mouseAction.setMouse({ coordX: e.clientX, coordY: e.clientY, src: 'https://via.placeholder.com/300' }));
                                        }
                                    }}
                                    position={{ x: 0, y: 0 }}
                                >
                                    <DefaultImg
                                        clicker={(e) => {
                                            console.log(e);
                                        }}
                                        style={{ width: '75px', height: '75px' }}
                                        source={img}
                                    ></DefaultImg>
                                </Draggable>
                            </div>
                        );
                    })}
                </TabGrid>
            ) : (
                <ImgUpload></ImgUpload>
            )}
        </TabContainer>
    );
}
