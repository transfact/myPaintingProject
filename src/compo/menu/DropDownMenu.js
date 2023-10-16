import styled from 'styled-components';
import { customGray } from '../../Common/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAction, menuAction } from '../../store';
import { useNavigate } from 'react-router-dom';

const DropBtn = styled.button`
    background-color: ${customGray};
    margin: 10px auto;
    /* margin-right: 10px;
    margin-bottom: 1px;
    margin-left: 10px;
    margin-top: 5px; */
    border: none;
`;

const DropLi = styled.li`
    &:hover {
        cursor: pointer;
    }
`;
const HR = styled.hr`
    margin: 0px;
    padding: 0px;
`;

const DropUl = styled.ul`
    position: absolute;
    box-shadow: 0px 0px 2px #c0c0c0;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
    z-index: 30;
    width: 70px;
    list-style: none;
    padding: 0;
    margin-top: 0px;
    margin-left: 10px;
    background-color: #f1f3f4;
`;

//일단 내보내기 닫기만
export default function DropDownMenu() {
    const navi = useNavigate();
    const dropMenu = useSelector((state) => state.dropMenu.fileDrop);

    const dispatch = useDispatch();
    //이거 상태로 바꿔서 reducer로 내보내야함. 끼아아아악
    const handleDropDown = (e) => {
        const classList = e.target.className.split(' ');
        if (classList[2] == 'fileDrop' && !dropMenu) {
            dispatch(menuAction.setMenu());
        }
    };

    function saveCanvas() {
        dispatch(saveAction.setCanvas({ myCanvas: true }));
        dispatch(menuAction.setMenu());
    }
    function windowClose() {
        navi('/');
    }

    return (
        <div style={{ position: 'relative' }}>
            <DropBtn className="fileDrop" onClick={handleDropDown}>
                파일
            </DropBtn>

            {dropMenu ? (
                <DropUl className="fileMenu">
                    <DropLi onClick={saveCanvas}>다운로드</DropLi>
                    <HR></HR>
                    <DropLi onClick={windowClose}>닫기</DropLi>
                </DropUl>
            ) : null}
            <DropBtn className="HelpDrop" onClick={handleDropDown}>
                도움말
            </DropBtn>
            <HR></HR>
        </div>
    );
}
