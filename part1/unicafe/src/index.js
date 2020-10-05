import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// "Button" component for exercise 1.10
const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>{ text }</button>
);

// refactored for exercise 1.11 to render a single table row
const Statistic = ({ text, value }) => (
  <tr> 
    <td>{ text }</td>
    <td>{ value }</td> 
  </tr>
);

// refactored for exercise 1.11 - renders data in a table now
const Statistics = ({ good, neutral, bad }) => {
  const totalReviews = good + neutral + bad;
  const totalScore = good - bad;

  return (
      <table>
        <thead>
          <tr>
            <th colSpan="2">Statistics</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text="Good Feedback" value={ good } />
          <Statistic text="Neutral Feedback" value={ neutral } />
          <Statistic text="Bad Feedback" value={ bad } />
          <Statistic text="Total Reviews" value={ totalReviews } />
          <Statistic 
            text="Average Score" 
            value={ totalReviews === 0 ? 
              'No feedback given yet' : 
              (totalScore / totalReviews).toFixed(2) } 
          />
          <Statistic 
            text="Positive" 
            value={ totalReviews === 0 ? 
              'No feedback given yet' : 
              (good * 100 / totalReviews).toFixed(2) } 
          />
        </tbody>
      </table>
  );
}

// refactored for exercise 1.10
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /* 
    updateFunction values: state update functions -> setGood, setNeutral, setBad.
    reviewType values: state values -> good, neutral, bad.
    returns a function which, based on the arguments provided to clickHandler,
    calls the appropriate updateFunction using the appropriate reviewType when invoked
  */ 
  const clickHandler = (updateFunction, reviewType) => () => {
    updateFunction(reviewType + 1);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div id="buttons">
        <Button handleClick={ clickHandler(setGood, good) } text="Good" />
        <Button handleClick={ clickHandler(setNeutral, neutral) } text="Neutral" />
        <Button handleClick={ clickHandler(setBad, bad) } text="Bad" />
      </div>
      <Statistics good={ good } neutral={ neutral } bad={ bad } />  
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);