import styled from 'styled-components';

const ColorBox = styled.div`
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.boxcolor};
    &:hover {
        cursor: pointer;
    }
`;
export default function Paint(props) {
    return <ColorBox boxcolor={props.color}></ColorBox>;
}
