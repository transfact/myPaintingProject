import TabView from '../compo/TabView';
import Menu from '../compo/Menu';
import styled from 'styled-components';
import Canvas from '../compo/Canvas';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div``;
const MenuContainer = styled.div``;

const WorkBenchContainer = styled.div`
    width: 100vw;
    display: flex;
`;

export default function PaintBoard() {
    return (
        <Container>
            <MenuContainer>
                <h1>PaintBoard</h1>
                <Menu></Menu>
            </MenuContainer>
            <WorkBenchContainer>
                <Canvas width={700} height={500}></Canvas>
                {/* <Canvas></Canvas> */}
                <TabView></TabView>
            </WorkBenchContainer>
        </Container>
    );
}
