import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRandomImage } from '../utils/helperFunctions';
import Space from './Space';
import MoveBtn from './MoveBtn';
import { moveList } from '../moveList';


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

const ResetBtn = styled.button`
    width: 150px;
    padding: 10px 0;
    text-align: center;
`;

export default function Board({ nRows = 5, nCols = 5, nObstacles = 2, probability = 0.2 }) {
    const [ board, setBoard ] = useState(createBoard());
    const [ location, setLocation ] = useState([ 0, 0 ]);

    function createBoard() {
        let board = [];
        let remainingObstacles = nObstacles;

        for (let i = 0; i < nRows; i++) {
            const row = [ nCols ];
            for (let j = 0; j < nCols; j++) {
                if (i === 0 && j === 0) {
                    row[ j ] = "START";
                } else if (i === (nRows - 1) && j === (nCols - 1)) {
                    row[ j ] = "GOAL!";
                } else {
                    row[ j ] = getRandomImage(probability);
                }
            }
            board.push(row);
        }
        return board;
    }

    function handleBtnClick() {
        setBoard(createBoard());
    }

    function handleMove(direction) {
        switch (direction) {
            case 'right':
                setLocation(prevLoc => {
                    const newLocation = [ prevLoc[ 0 ], prevLoc[ 1 ] + 1 ];
                    setBoard(prevBoard => {
                        const newBoard = [ ...prevBoard ];
                        // Clear old position
                        newBoard[ prevLoc[ 0 ] ][ prevLoc[ 1 ] ] = "";
                        // Move hero icon to new position
                        newBoard[ newLocation[ 0 ] ][ newLocation[ 1 ] ] = "👨‍🚀";
                        return newBoard;
                    });
                    return newLocation;
                });
                break;

            case 'down':
                setLocation(prevLoc => {
                    const newLocation = [ prevLoc[ 0 ] + 1, prevLoc[ 1 ] ];
                    setBoard(prevBoard => {
                        const newBoard = [ ...prevBoard ];
                        // Clear old position
                        newBoard[ prevLoc[ 0 ] ][ prevLoc[ 1 ] ] = "";
                        // Move hero icon to new position
                        newBoard[ newLocation[ 0 ] ][ newLocation[ 1 ] ] = "👨‍🚀";
                        return newBoard;
                    });
                    return newLocation;
                });

                break;

            case 'left':
                setLocation(prevLoc => [ prevLoc[ 0 ] - 1, prevLoc[ 1 ] ]);
                break;

            case 'up':
                setLocation(prevLoc => [ prevLoc[ 0 ], prevLoc[ 1 ] - 1 ]);
                break;

            default:
                console.log("hmmm...");
        }
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
            {moveList.map(move => (
                <MoveBtn
                    key={`move-${move.direction}`}
                    symbol={move.symbol}
                    moveHero={() => handleMove(move.direction)}
                />
            ))}
            <ResetBtn onClick={handleBtnClick}>Reset</ResetBtn>
        </Container>
    );
};
