import Draggable from 'react-draggable';
import LocalStorage from '../../Common/LocalStoarge';
import { useSelector, useDispatch } from 'react-redux';
import DefaultImg from './DefaultImg';
import { mouseAction } from '../../store';
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
            <h3>ImgUpload</h3>
            <input type="file" accept="image/jpg,impge/png,image/jpeg,image/gif" name="profile_img" onChange={onChange}></input>
            <br></br>
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
                        <DefaultImg style={{ width: '50px', height: '50px' }} source={imgData} />
                    </Draggable>
                </div>
            ))}
        </>
    );
}
