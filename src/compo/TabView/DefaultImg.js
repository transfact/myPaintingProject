import { mouseAction } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const CustomImg = styled.img`
    &:hover {
        cursor: pointer;
    }
`;

export default function DefaultImg({ style, onMouseDown, onTouchStart, onTouchEnd, clicker }) {
    //그러니까, 여기서 이미지를 drop했을 때(mouseup/touchend일때 ), cavnas의 위치를 찾을 수 있어야하고,
    //만약 canvas의 위치가 맞다면 callback으로 image의 src를 보내준다. (혹은 상태를 변경한다)
    //혹은 mouseup이 되면 모든 경우에 canvas에 상태를 보내주며,

    //아마 상태는 이미지 src와 마우스 x,y좌표가 되겠다.
    const dispatch = useDispatch();
    function onMouseUp(e) {
        console.log(e.target.style);
        console.log(e.target);

        console.log(window.getComputedStyle(e.target).getPropertyValue('transform'));

        dispatch(mouseAction.setMouse({ coordX: e.clientX, coordY: e.clientY, src: 'https://via.placeholder.com/300' }));
    }

    return (
        <>
            <CustomImg onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={style} src="https://via.placeholder.com/300" alt="default" />
        </>
    );
}
