import styled from 'styled-components';

const ToolBox = styled.div`
    width: 30px;
    height: 30px;
    &:hover {
        cursor: pointer;
    }
`;
export default function Tool(props) {
    return <ToolBox>{props.tool}</ToolBox>;
}
