import React, { useState } from 'react';
import styled from 'styled-components';
import { getRandomImage } from '../utils/helperFunctions';
import Space from './Space';
import MoveBtn from './MoveBtn';
import { moveList } from '../moveList';
import { theme } from '../theme';
import chroma from 'chroma-js';


const Container = styled.div`
    max-width: 800px;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const ResetBtn = styled.button`
    width: 150px;
    padding: 10px 0;
    text-align: center;
`;

const Table = styled.table`
    border-spacing: 8px;
    border-collapse: separate;
`;

const TableRow = styled.tr`
`;

const MoveBtnContainer = styled.div`
    margin-top: 1rem;
`;

export default function Board({ nRows = 5, nCols = 5, nObstacles = 2, probability = 0.2 }) {
    const [ board, setBoard ] = useState(createBoard());
    const [ location, setLocation ] = useState([ 0, 0 ]);
    const [ hasWon, setHasWon ] = useState(false);
    const [ spectrum, setSpectrum ] = useState(getShades([ theme.colors.main, theme.colors.tertiary, theme.colors.secondary ]));


    function getShades(colorsArr) {
        const colorSpectrum = chroma.scale(colorsArr).domain([ 0, .3, 0.4, 0.6, .7, 1 ]).colors((nCols + nRows - 1));
        return colorSpectrum;
    }

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
        setLocation([ 0, 0 ]);
        setHasWon(false);
    }

    function updateBoard(prevLoc, newLocation) {
        setBoard(prevBoard => {
            const newBoard = [ ...prevBoard ];
            // Clear old position
            newBoard[ prevLoc[ 0 ] ][ prevLoc[ 1 ] ] = "";
            // Move hero icon to new position
            newBoard[ newLocation[ 0 ] ][ newLocation[ 1 ] ] = "👨‍🚀";
            return newBoard;
        });
    }

    function handleMove(direction) {
        switch (direction) {
            case 'right':
                setLocation(prevLoc => {
                    if (prevLoc[ 1 ] + 1 < nCols) {
                        const newLocation = [ prevLoc[ 0 ], prevLoc[ 1 ] + 1 ];
                        updateBoard(prevLoc, newLocation);
                        if (newLocation[ 0 ] + 1 === nRows && newLocation[ 1 ] + 1 === nCols) {
                            setHasWon(true);
                        }
                        return newLocation;
                    }
                    return prevLoc;
                });
                break;

            case 'down':
                setLocation(prevLoc => {
                    if (prevLoc[ 0 ] + 1 < nCols) {
                        const newLocation = [ prevLoc[ 0 ] + 1, prevLoc[ 1 ] ];
                        updateBoard(prevLoc, newLocation);
                        if (newLocation[ 0 ] + 1 === nRows && newLocation[ 1 ] + 1 === nCols) {
                            setHasWon(true);
                        }
                        return newLocation;
                    }
                    return prevLoc;
                });

                break;

            case 'left':
                setLocation(prevLoc => {
                    if (prevLoc[ 1 ] - 1 < nCols) {
                        const newLocation = [ prevLoc[ 0 ], prevLoc[ 1 ] - 1 ];
                        updateBoard(prevLoc, newLocation);
                        if (newLocation[ 0 ] + 1 === nRows && newLocation[ 1 ] + 1 === nCols) {
                            setHasWon(true);
                        }
                        return newLocation;
                    }
                    return prevLoc;
                });
                break;

            case 'up':
                setLocation(prevLoc => {
                    if (prevLoc[ 0 ] - 1 < nCols) {
                        const newLocation = [ prevLoc[ 0 ] - 1, prevLoc[ 1 ] ];
                        updateBoard(prevLoc, newLocation);
                        if (newLocation[ 0 ] + 1 === nRows && newLocation[ 1 ] + 1 === nCols) {
                            setHasWon(true);
                        }
                        return newLocation;
                    }
                    return prevLoc;
                });
                break;

            default:
                console.log("hmmm...");
        }
    }

    return (
        <Container>
            <Table>
                <tbody>
                    {board.map((row, rowKey) =>
                        <TableRow key={rowKey}>
                            {row.map((space, idx) => {
                                return (
                                    <Space
                                        key={idx}
                                        image={board[ rowKey ][ idx ]}
                                        hasWon={hasWon}
                                        coord={`${rowKey}-${idx}`}
                                        color={spectrum[ idx + rowKey ]}
                                    />
                                );
                            }
                            )}
                        </TableRow>
                    )}
                </tbody>
            </Table>
            <MoveBtnContainer>
                {moveList.map(move => (
                    <MoveBtn
                        key={`move-${move.direction}`}
                        symbol={move.symbol}
                        moveHero={() => handleMove(move.direction)}
                    />
                ))}
            </MoveBtnContainer>
            <ResetBtn onClick={handleBtnClick}>Reset</ResetBtn>
        </Container>
    );
};
