import React from 'react';
import './../index.css';


export type SquareValue = 'O' | 'X' | null; 

interface SquareProps {
  value: SquareValue;
  onClick(): void;
}

const Square: React.FC<SquareProps> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;