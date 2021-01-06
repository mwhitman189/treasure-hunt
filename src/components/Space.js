import React from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js';


const Container = styled.td`
    background-color: ${({ color, hasWon }) => hasWon ? '#0b91e5' : color};
    width: 100px;
    height: 100px;
    text-align: center;
    border-radius: 5px;
    box-shadow: ${({ color, hasWon }) => hasWon ? `0 0 4px 4px #0b91e555, inset 0 0 7px 6px ${chroma('#0b91e5').darken()}80` : `0 0 4px 4px ${color}55, inset 0 0 7px 6px ${chroma(color).darken()}80`};
`;

export default function Space({ image, color, hasWon }) {

    return (
        <Container hasWon={hasWon} color={color}>{image && image}</Container>
    );
}
