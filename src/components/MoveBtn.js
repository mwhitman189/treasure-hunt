import styled from 'styled-components';


const Btn = styled.button`
    width: 150px;
    height: 150px;
    text-align: center;
`;

export default function MoveBtn({ symbol, moveHero }) {

    return (
        <Btn onClick={moveHero}>{symbol}</Btn>
    );
}
