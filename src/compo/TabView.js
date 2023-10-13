import { useRef, useState } from 'react';

import DefaultImg from './TabView/DefaultImg';
import ImgUpload from './TabView/ImgUpload';
import styled from 'styled-components';
import Draggable from 'react-draggable';
const TabContainer = styled.div`
    width: 25vw;
    margin: 10px;
`;

const TabBtn = styled.button``;
const TabDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export default function TabView() {
    const [tab, setTab] = useState(0);
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
            {tab == 0 ? (
                <div style={{ position: 'relative' }}>
                    <Draggable position={{ x: 0, y: 0 }}>
                        <DefaultImg
                            clicker={(e) => {
                                console.log(e);
                            }}
                            style={{ width: '300px', height: '300px' }}
                        ></DefaultImg>
                    </Draggable>
                </div>
            ) : (
                <ImgUpload></ImgUpload>
            )}
        </TabContainer>
    );
}
