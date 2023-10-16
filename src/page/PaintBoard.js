import TabView from '../compo/TabView';
import Menu from '../compo/Menu';
import styled from 'styled-components';
import Canvas from '../compo/Canvas';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuAction } from '../store/index';

const Container = styled.div``;
const MenuContainer = styled.div``;

const WorkBenchContainer = styled.div`
    width: 100vw;
    display: flex;
`;

export default function PaintBoard() {
    const dispatch = useDispatch();
    const dropMenu = useSelector((state) => state.dropMenu.fileDrop);
    const [windowSize, setWindowSize] = useState([(window.innerWidth * 7) / 10, (window.innerHeight * 6) / 10]);
    const handleResize = () => {
        setWindowSize([(window.innerWidth * 7) / 10, (window.innerHeight * 6) / 10]);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleMenu = () => {
        dispatch(menuAction.setMenu());
    };
    return (
        <Container onClick={dropMenu ? handleMenu : null}>
            <MenuContainer>
                <h1 style={{ textAlign: 'center' }}>PaintBoard</h1>
                <Menu></Menu>
            </MenuContainer>
            <WorkBenchContainer>
                <Canvas width={windowSize[0]} height={windowSize[1]}></Canvas>
                <TabView width={window.innerWidth - windowSize[0]} height={windowSize[1]}></TabView>
            </WorkBenchContainer>
        </Container>
    );
}
