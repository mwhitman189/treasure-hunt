import styled from 'styled-components';


const Btn = styled.button`
    font-size: 5rem;
    text-align: center;
    margin: 2px;
    padding: 0;
    cursor: pointer;
    background-color: inherit;
    border: none;

    &:hover {
        opacity: .8;
    }
`;

export default function MoveBtn({ symbol, moveHero }) {

    return (
        <Btn onClick={moveHero}>{symbol}</Btn>
    );
}
