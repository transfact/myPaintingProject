import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customGray } from '../../Common/colors';
import { useRef, useState } from 'react';

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
    const [fileDrop, setFileDrop] = useState(false);
    //이거 상태로 바꿔서 reducer로 내보내야함. 끼아아아악
    const handleDropDown = (e) => {
        const classList = e.target.className.split(' ');
        if (classList[2] == 'fileDrop') {
            console.log('fileDrop');
            setFileDrop(!fileDrop);
        }
    };
    return (
        <>
            <DropBtn className="fileDrop" onClick={handleDropDown}>
                파일
            </DropBtn>
            {fileDrop ? (
                <DropUl className="fileMenu">
                    <li>내보내기</li>
                    <li>닫기</li>
                </DropUl>
            ) : null}

            <DropBtn className="HelpDrop" onClick={handleDropDown}>
                도움말
            </DropBtn>
        </>
    );
}
