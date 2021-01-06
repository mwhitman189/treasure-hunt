import React from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js';


const Container = styled.td`
    background-color: ${({ color, hasWon }) => hasWon ? '#0b91e5' : color};
    width: 80px;
    height: 80px;
    text-align: center;
    border-radius: 50%;
    box-shadow: ${({ color, hasWon }) => hasWon ? `0 0 10px 7px #0b91e595, inset -10px -10px 7px 6px ${chroma('#0b91e5').darken()}70` : `0 0 10px 7px ${color}95, inset -10px -10px 7px 6px ${chroma(color).darken()}70`};
`;

export default function Space({ image, color, hasWon }) {

    return (
        <Container hasWon={hasWon} color={color}>{image && image}</Container>
    );
}
