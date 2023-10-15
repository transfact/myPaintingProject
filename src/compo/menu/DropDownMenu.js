import styled from 'styled-components';
import { customGray } from '../../Common/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAction } from '../../store';
import { useNavigate } from 'react-router-dom';

const DropBtn = styled.button`
    background-color: ${customGray};
    margin-right: 10px;
    border: none;
`;

const DropUl = styled.ul`
    position: relative;
    width: 50px;
    height: 100px;
    list-style: none;
    padding: 0;
    background-color: gray;
`;

//일단 내보내기 닫기만
export default function DropDownMenu() {
    const navi = useNavigate();

    const [fileDrop, setFileDrop] = useState(false);
    const dispatch = useDispatch();
    //이거 상태로 바꿔서 reducer로 내보내야함. 끼아아아악
    const handleDropDown = (e) => {
        const classList = e.target.className.split(' ');
        if (classList[2] == 'fileDrop') {
            console.log('fileDrop');
            setFileDrop(!fileDrop);
        }
    };
    function saveCanvas() {
        dispatch(saveAction.setCanvas({ myCanvas: true }));
    }
    function windowClose() {
        navi('/');
    }
    return (
        <>
            <DropBtn className="fileDrop" onClick={handleDropDown}>
                파일
            </DropBtn>
            {fileDrop ? (
                <DropUl className="fileMenu">
                    <li onClick={saveCanvas}>다운로드</li>
                    <li onClick={windowClose}>닫기</li>
                </DropUl>
            ) : null}

            <DropBtn className="HelpDrop" onClick={handleDropDown}>
                도움말
            </DropBtn>
        </>
    );
}
