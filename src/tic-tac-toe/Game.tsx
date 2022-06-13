import React,{useState, useCallback, useEffect} from 'react';
import Board from './Board';
import "./../index.css"
import {SquareValue} from './Square'

interface GamesProps {
    xStart: boolean,
    updateResult: (args: string) => boolean
}

const Game: React.FC<GamesProps> = props => {
  const [xIsNext, setXIsNext] = useState<boolean>(props.xStart);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [history, setHistory] = useState<{squares: SquareValue[]}[]>([
    {
      squares: Array(9).fill(null)
    }
  ]);

  const handleClick = (i:number):void => {
    const newHistory  = history.slice(0,stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([
      {
        squares: squares
      }
    ]))
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    (props.xStart==true) ? (setXIsNext((step%2) === 0)) : (setXIsNext((step%2) !== 0))
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  
  var status: string;
  var result: string
  if (winner) {
    status = "Winner: " + winner;
    result = winner
  } else if (!winner && stepNumber ==9) {
    status = "Tie";
    result = "Tie"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); 
  }
  
  useEffect (()=> {
    if (result){
      let xStart: boolean = props.updateResult(result)
      setHistory ([{squares: Array(9).fill(null)}]);
      setStepNumber(0);
      setXIsNext(xStart);
    }
  })
  
  return (
      <div className="game">
          <div className="game-board">
          <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
          />
          </div>
          <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          </div>
      </div>
  );
}
  
const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;