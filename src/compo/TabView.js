import { useState } from 'react';

import DefaultImg from './TabView/DefaultImg';
import ImgUpload from './TabView/ImgUpload';
import styled from 'styled-components';

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
    return (
        <TabContainer>
            <TabDiv>
                <TabBtn onClick={() => setTab(0)}>Default</TabBtn>
                <TabBtn onClick={() => setTab(1)}>Upload</TabBtn>
            </TabDiv>
            {tab == 0 ? <DefaultImg></DefaultImg> : <ImgUpload></ImgUpload>}
        </TabContainer>
    );
}
