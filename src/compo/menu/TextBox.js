import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { canvasAction } from '../../store';
import React from 'react';
const TextInput = styled.input`
    position: absolute;
    left: ${(props) => Number(props.$setx - 4) + 'px'};
    top: ${(props) => Number(props.$sety - 4) + 'px'};
`;

export default function TextBox(props) {
    const { EditText } = useSelector((state) => state.canvas);

    const dispatch = useDispatch();
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const ctx = props.ctx;
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '30px Arial';
            ctx.fillText(EditText.text, EditText.coordX - 4, EditText.coordY - 4);
            dispatch(
                canvasAction.setEditInput({
                    coordX: -1,
                    coordY: -1,
                    newInput: '',
                })
            );
            props.setKill(null);
        }
    };
    return (
        <TextInput
            $setx={props.coord.x}
            $sety={props.coord.y}
            value={EditText.text}
            onChange={(e) => {
                dispatch(canvasAction.setEditInput({ coordX: props.coord.x, coordY: props.coord.y, newInput: e.target.value }));
            }}
            onKeyDown={handleKeyDown}
            autoFocus={true}
            onBlur={({ target }) => target.focus()}
        />
    );
}
