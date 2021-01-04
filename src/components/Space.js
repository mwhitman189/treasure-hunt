import React from 'react';
import styled from 'styled-components';


const Container = styled.td`
    background-color: yellow;
    width: 100px;
    height: 100px;
    text-align: center;
`;

export default function Space({ image }) {
    return (
        <Container>{image && image}</Container>
    );
}
