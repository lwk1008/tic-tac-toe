import React,{useState, useCallback} from 'react';
import Game from './Game';
import "./../index.css"

var xStart: boolean = false

const Round: React.FC = () => {
  //const [xStart, setXStart] = useState<boolean>(true);
  const [result, setResult] = useState<string>("");
  const [xScore, setXScore] = useState<number>(0);
  const [oScore, setOScore] = useState<number>(0);

  const updateResult = (result: string): boolean => {
    setResult(result)
    if (result=="X"){
      xStart = true;
      setXScore(xScore+1)
    } else if (result=="O"){
      xStart = false;
      //console.log(xStart);
      //setXStart(!xStart)
      //console.log(xStart);
      setOScore(oScore+1)
    } else if (result=="Tie"){
      xStart = !xStart
    }
    return xStart;
  }

  if (xScore == 2 || oScore == 2){
    return (
      <div>
        <p>{result} wins the game</p>
      </div>
    )
  }

  return (
  <div className="round">
    <table className = "table">
      <tbody>
        <tr>
          <th>Player</th>
          <th>Point</th>
        </tr>
        <tr>
          <td>X</td>
          <td>{xScore}</td>
        </tr>
        <tr>
          <td>O</td>
          <td>{oScore}</td>
        </tr>
      </tbody>
    </table>
    <br></br>
    <Game 
      xStart = {xStart}
      updateResult = {updateResult}
    />
  </div>
  );
}

export default Round;