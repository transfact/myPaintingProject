import Draggable from 'react-draggable';
import LocalStorage from '../../Common/LocalStoarge';
import { useSelector, useDispatch } from 'react-redux';
import DefaultImg from './DefaultImg';
import { mouseAction } from '../../store';
import styled from 'styled-components';

const TabGrid = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    grid-template-rows: repeat(3, minmax(0, auto)); /* 2개의 행을 생성합니다. */
    grid-template-columns: repeat(2, minmax(0, auto)); /* 3개의 열을 생성합니다. */
    /* gap: 10px; 그리드 아이템 사이의 간격을 조절합니다. 원하는 간격으로 조정하세요. */
`;

const InputMenu = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const DivButton = styled.div`
    display: inline-block;
    padding: 5px 10px;
    background-color: #f0f0f0; /*007bff 배경색 (크롬 버튼과 유사한 파란색) */
    color: black; /* 글꼴 색상 (흰색) */
    border: 1px solid black; /* 얇은 테두리 (크롬 버튼과 유사) */
    border-radius: 4px; /* 둥근 모서리 (크롬 버튼과 유사) */
    /*   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);  그림자 효과 (크롬 버튼과 유사) */
    font-size: 16px; /* 글꼴 크기 (크롬 버튼과 유사) */
    cursor: pointer;
    text-align: center;
`;
export default function ImgUpload() {
    const { coordX, coordY, src } = useSelector((state) => state.mouse);

    const dispatch = useDispatch();
    const [localImgs, setLocalImgs] = LocalStorage('imgs', []);

    function onMouseUp(e) {
        // console.log(e.target);
        // console.log('defaultImg Coord', coordX, coordY);
        const imgRect = e.target.getBoundingClientRect();
        const leftDiff = coordX - imgRect.left; // 이미지의 좌측 모서리의 화면 상 x 좌표
        const topDiff = coordY - imgRect.top; // 이미지의 좌측 모서리의 화면 상 y 좌표 = .top; // 이미지의 좌측 모서리의 화면 상 y 좌표

        dispatch(mouseAction.setMouse({ coordX: e.clientX - leftDiff, coordY: e.clientY - topDiff, src: 'https://via.placeholder.com/300' }));
    }

    function onChange(e) {
        const imgFile = e.target.files[0];

        if (imgFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imgData = e.target.result;
                setLocalImgs([...localImgs, imgData]);
            };

            reader.readAsDataURL(imgFile);
        }
    }
    // console.log(localImgs);
    return (
        <>
            <TabGrid>
                {localImgs.map((imgData, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <Draggable
                            onStart={(e) => {
                                if (coordX == -1) {
                                    dispatch(mouseAction.setMouse({ coordX: e.clientX, coordY: e.clientY, src: 'https://via.placeholder.com/300' }));
                                }
                            }}
                            position={{ x: 0, y: 0 }}
                        >
                            <DefaultImg style={{ width: '75px', height: '75px' }} source={imgData} />
                        </Draggable>
                    </div>
                ))}
            </TabGrid>
            <InputMenu>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    id="files"
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    name="profile_img"
                    value=""
                    onChange={onChange}
                    onClick={(e) => {
                        e.target.value = null;
                    }}
                />
                <label htmlFor="files">
                    <DivButton>Upload</DivButton>
                </label>
                <DivButton
                    onClick={() => {
                        setLocalImgs([]);
                    }}
                >
                    Clear
                </DivButton>
            </InputMenu>
        </>
    );
}
