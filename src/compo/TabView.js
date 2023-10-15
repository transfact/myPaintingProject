import { useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import DefaultImg from './TabView/DefaultImg';
import ImgUpload from './TabView/ImgUpload';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { mouseAction } from '../store/index';

const TabContainer = styled.div`
    width: 25vw;
    margin: 10px;
`;

const TabBtn = styled.button``;
const TabDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const TabGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); /* 2개의 행을 생성합니다. */
    grid-template-columns: repeat(3, 1fr); /* 3개의 열을 생성합니다. */
    gap: 10px; /* 그리드 아이템 사이의 간격을 조절합니다. 원하는 간격으로 조정하세요. */
`;
const imgSource = ['Circle.png', 'Square.png', 'Uarrow.png', 'Darrow.png', 'Rarrow.png', 'Larrow.png'];
export default function TabView() {
    const [tab, setTab] = useState(0);
    const { coordX, coordY, src } = useSelector((state) => state.mouse);
    const dispatch = useDispatch();
    // const defaultPostions = useRef([0, 0]);
    // const mouseDown = (e) => {
    //     defaultPostions.current = [e.clientX, e.clientY];
    // };
    return (
        <TabContainer>
            <TabDiv>
                <TabBtn onClick={() => setTab(0)}>Default</TabBtn>
                <TabBtn onClick={() => setTab(1)}>Upload</TabBtn>
            </TabDiv>
            <TabGrid>
                {tab == 0 ? (
                    imgSource.map((img) => {
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
                                        style={{ width: '50px', height: '50px' }}
                                        source={img}
                                    ></DefaultImg>
                                </Draggable>
                            </div>
                        );
                    })
                ) : (
                    <ImgUpload></ImgUpload>
                )}
            </TabGrid>
        </TabContainer>
    );
}
