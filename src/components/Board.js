import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRandomImage } from '../utils/helperFunctions';
import Space from './Space';
import KoyaImg from '../static/images/koya_in_black.jpg';


const Container = styled.div`
    background-color: inherit;
    border: 1px solid black;
`;

const Title = styled.h1`
    color: black;
`;

const SpecialText = styled.span`
    font-size: 2rem;
    text-transform: uppercase;
`;

export default function Board({ nRows = 5, nCols = 5, nObstacles = 2, probability = 0.2 }) {
    const [ board, setBoard ] = useState(createBoard());

    function createBoard() {
        let board = [];
        let remainingObstacles = nObstacles;

        for (let i = 0; i < nRows; i++) {
            const row = [ nCols ];
            for (let j = 0; j < nCols; j++) {
                if (i !== 0 || j !== 0) {
                    row[ j ] = getRandomImage(probability);
                } else {
                    row[ j ] = false;
                }
            }
            board.push(row);
        }
        return board;
    }

    return (
        <Container>
            <Title>Koya's Adventures in
                {' '}<SpecialText>Space!</SpecialText>
            </Title>

            <table>
                <tbody>
                    {board.map((row, rowKey) =>
                        <tr key={rowKey}>
                            {row.map((space, idx) =>
                                <Space
                                    key={idx}
                                    image={board[ rowKey ][ idx ]}
                                    coord={`${rowKey}-${idx}`}
                                />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </Container>
    );
}
