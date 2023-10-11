import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { canvasAction } from '../../../store';

const ColorBox = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 3px;
    background-color: ${(props) => props.boxcolor};
    &:hover {
        cursor: pointer;
    }
`;
export default function Paint(props) {
    const dispatch = useDispatch();
    const setColor = () => {
        // console.log('setting color ', props.color);
        dispatch(canvasAction.setColor({ color: props.color }));
    };

    return <ColorBox onClick={setColor} boxcolor={props.color}></ColorBox>;
}
