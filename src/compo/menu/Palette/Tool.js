import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faBrush, faEyeDropper, faFont, faEraser, faFlaskVial } from '@fortawesome/free-solid-svg-icons';
//순서대로 pencil,brush,spoids, textbox,eraser,beaker
import { toolUppername } from '../../../Common/tools';
import { useDispatch } from 'react-redux';
import { canvasAction } from '../../../store';
const ToolBox = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 3px;
    &:hover {
        cursor: pointer;
    }
`;

export default function Tool(props) {
    const dispatch = useDispatch();
    const setTool = () => {
        dispatch(canvasAction.setTool({ tool: props.tool }));
    };

    switch (props.tool) {
        case toolUppername.PENCIL:
            return (
                <ToolBox onClick={setTool}>
                    <FontAwesomeIcon icon={faPencil} />
                </ToolBox>
            );
        case toolUppername.BRUSH:
            return (
                <ToolBox onClick={setTool}>
                    <FontAwesomeIcon icon={faBrush} />
                </ToolBox>
            );
        case toolUppername.SPOIDS:
            return (
                <ToolBox onClick={setTool}>
                    <FontAwesomeIcon icon={faEyeDropper} />
                </ToolBox>
            );
        case toolUppername.TEXTBOX:
            return (
                <ToolBox onClick={setTool}>
                    <FontAwesomeIcon icon={faFont} />
                </ToolBox>
            );
        case toolUppername.ERASER:
            return (
                <ToolBox onClick={setTool}>
                    <FontAwesomeIcon icon={faEraser} />
                </ToolBox>
            );
        case toolUppername.BEAKER:
            return (
                <ToolBox onClick={setTool}>
                    <FontAwesomeIcon icon={faFlaskVial} />
                </ToolBox>
            );
        default:
            return null;
    }
}
