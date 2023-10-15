import { mouseAction } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const CustomImg = styled.img`
    &:hover {
        cursor: pointer;
    }
`;

export default function DefaultImg({ style, onMouseDown, onTouchStart, onTouchEnd, clicker, source }) {
    //그러니까, 여기서 이미지를 drop했을 때(mouseup/touchend일때 ), cavnas의 위치를 찾을 수 있어야하고,
    //만약 canvas의 위치가 맞다면 callback으로 image의 src를 보내준다. (혹은 상태를 변경한다)
    //혹은 mouseup이 되면 모든 경우에 canvas에 상태를 보내주며,
    //아마 상태는 이미지 src와 마우스 x,y좌표가 되겠다.
    const { coordX, coordY, src } = useSelector((state) => state.mouse);
    const dispatch = useDispatch();
    function onMouseUp(e) {
        // console.log(e.target);
        // console.log('defaultImg Coord', coordX, coordY);
        const imgRect = e.target.getBoundingClientRect();
        const leftDiff = coordX - imgRect.left; // 이미지의 좌측 모서리의 화면 상 x 좌표
        const topDiff = coordY - imgRect.top; // 이미지의 좌측 모서리의 화면 상 y 좌표 = .top; // 이미지의 좌측 모서리의 화면 상 y 좌표

        dispatch(mouseAction.setMouse({ coordX: e.clientX - leftDiff, coordY: e.clientY - topDiff, src: source ? source : 'https://via.placeholder.com/300' }));
    }

    return (
        <>
            <CustomImg onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={style} src={source} alt="default" />
        </>
    );
}
