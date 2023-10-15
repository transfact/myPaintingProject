import TabView from '../compo/TabView';
import Menu from '../compo/Menu';
import styled from 'styled-components';
import Canvas from '../compo/Canvas';
import { useEffect, useState } from 'react';

const Container = styled.div``;
const MenuContainer = styled.div``;

const WorkBenchContainer = styled.div`
    width: 100vw;
    display: flex;
`;

export default function PaintBoard() {
    const [windowSize, setWindowSize] = useState([(window.innerWidth * 7) / 10, window.innerHeight / 2]);
    const handleResize = () => {
        setWindowSize([(window.innerWidth * 7) / 10, window.innerHeight / 2]);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container>
            <MenuContainer>
                <h1>PaintBoard</h1>
                <Menu></Menu>
            </MenuContainer>
            <WorkBenchContainer>
                <Canvas width={windowSize[0]} height={windowSize[1]}></Canvas>
                <TabView></TabView>
            </WorkBenchContainer>
        </Container>
    );
}
