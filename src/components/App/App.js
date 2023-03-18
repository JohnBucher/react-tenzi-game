import React from 'react';
import './App.css';
import Die from '../Die/Die';
import Confetti from 'react-confetti';
import { Text } from 'react-native';

export default function App() {
  const [dice, setDice] = React.useState(generateDice());
  const [tenzies, setTenzies] = React.useState(false);
  
  const [clicks, setClicks] = React.useState(0);
  const [startTime, setStartTime] = React.useState(new Date());
  const [finishMsg, setFinishMsg] = React.useState('');

  // When the dice object changes =>
    // Check to see if user has won
    // IF user has won, set tenzies to true and update "high-score"
  React.useEffect(() => {
    const value = dice[0].value;
    const calculateWin = dice.every(die => die.isHeld && die.value === value);
    if(calculateWin) {
      setTenzies(true);
      const endTime = new Date();
      const timeElapsed = new Date(endTime - startTime);

      saveScore(timeElapsed);
    };
  }, [ dice ])

  function padResultValues(value) {
    return ("0" + value).slice(-2);
  }

  function saveScore(score) {
    // Update "high-score" if value is lower than what is currently stored
    // Check for a score that is less than a day before saving/printing
    let message = "";

    if(score.getUTCFullYear() === 1970 && score.getUTCMonth() === 0 && score.getUTCDate() === 1) {
      message += `Score =  ${padResultValues(score.getUTCHours())}:${padResultValues(score.getUTCMinutes())}:${padResultValues(score.getUTCSeconds())}. `

      let prevScore = new Date(localStorage.getItem("score"));
      if(!prevScore || prevScore > score) {
        localStorage.setItem("score", score);

        message += "\nNew High Score!";
      } else {
        message += `\nHigh Score = ` + 
        `${padResultValues(prevScore.getUTCHours())}:${padResultValues(prevScore.getUTCMinutes())}:${padResultValues(prevScore.getUTCSeconds())}.`
      }
    } else {
      message += "It took you longer than a day to complete. Try again!";
    }

    setFinishMsg(message);
    console.log(message);
  }

  // Generate the dice needed for a new game
  function generateDice() {
    const dice = [];
    for(let i = 0; i < 10; i ++) {
      dice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: i
      })
    }

    return dice;
  }

  // Map the objects in the dice object to a list of "Die" HTML Elements
  const diceEl = dice.map(die => (
    <Die value={die.value} key={die.id} isHeld={die.isHeld} hold={() => holdDice(die.id)} />
  ))

  // Re-roll the non-selected dice
  function rollDice() {
    // If button is clicked after a "win" => reset game
    if(tenzies) {
      setTenzies(false)
      setDice(generateDice())
      setStartTime(new Date())
      setClicks(0)
    } else {
      setDice(prevDice => prevDice.map(die => {
        if(!die.isHeld) die.value = Math.ceil(Math.random() * 6);
        return die;
      }));
      setClicks(prevClicks => prevClicks + 1);
    }
  }

  // Hold dice, stopping those values from changing on re-rolls
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      if(die.id === id) die.isHeld = !die.isHeld;
      return die;
    }))
  }

  return (
    <div className="app-container">
      {tenzies && <Confetti />}
      <div className="content-container">
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze
        it at its current value between rolls</p>

        <div className='die-container'>
          {diceEl}
        </div>

        <div className='button-container'>
          <button className='roll-button' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>

        <div className='score-container'>
          {tenzies && <Text>{finishMsg}</Text>}
        </div>
      </div>
    </div>
  );
}
