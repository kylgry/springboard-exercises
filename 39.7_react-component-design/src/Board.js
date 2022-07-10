import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=6, chanceLightStartsOn=0.2 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array(nrows).fill().map(()=>Array(ncols).fill())
    // TODO: create array-of-arrays of true/false values
    for (let r = 0; r < nrows; r++) {
      for (let c = 0; c < ncols; c++) {
        initialBoard[r][c] = (Math.random() < chanceLightStartsOn ? true : false)
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(r => r.every(c => c === false))
  }

  function flipCellsAround(y,x) {

    setBoard(oldBoard => {
      // const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const updatedBoard = [...oldBoard]

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          flipCell(y+j, x+i, updatedBoard)
        }
      }

      return updatedBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) { return <h1>nice work, you won!</h1> }

  // make table board

  return (
    <table>
      <tbody>
      {board.map((r, ir) => (
        <tr key={ir}>
          {r.map((c, ic) => (
          <Cell isLit={c} flipCellsAroundMe={() => flipCellsAround(ir,ic)} key={`${ir}-${ic}`} />
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )

  // TODO
}

export default Board;
