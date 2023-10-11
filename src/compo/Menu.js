import DropDownMenu from './menu/DropDownMenu';
import Palette from './menu/Palette';
import styled from 'styled-components';
import { customGray } from '../Common/colors';

const MenuContainer = styled.div`
    background-color: ${customGray};
`;
export default function Menu() {
    return (
        <MenuContainer>
            <DropDownMenu></DropDownMenu>
            <Palette></Palette>
        </MenuContainer>
    );
}
