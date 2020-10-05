import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Added button for exercise 1.12
const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  /* 
    votesCast tracks how many votes have been cast for the currently 
    displayed quote in a given display cycle
  */
  const [votesCast, setVotesCast] = useState(0);
  
  const newQuote = () => {
    let index = selected;

    /*
      this block ensures that the same quote isn't displayed repeatedly
      and every call to newQuote is guaranteed to show a new quote
    */
    do {
      index = Math.floor(Math.random() * anecdotes.length);
    } while (index === selected);
    
    setSelected(index);
    
    // resets votes cast to 0 when a quote is displayed
    setVotesCast(0);
  }
  const voteQuote = () => {
    // you can only vote for a quote once in a display cycle i.e. when votesCast === 0
    if (votesCast === 0) {
      const newState = [...votes];
      newState[selected] += 1;
      setVotes([...newState]);
      // once a vote is cast, votesCast is changed to a nonzero value to avoid repeat voting
      setVotesCast(1);
    }
  }

  // returns the index of the highest value in votes. returns first index for multiple results
  const mostUpvotedIndex = () => votes.indexOf(Math.max(...votes));

  return (
    <div>
      <p>{ anecdotes[selected] } - { votes[selected] } votes</p>
      <section>
        <button onClick={ voteQuote }>Vote</button>
        <button onClick={ newQuote }>New Quote</button>
      </section>
      <h2>Most voted quote:</h2>
      <p>{ anecdotes[mostUpvotedIndex()] } - { votes[mostUpvotedIndex()] } votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);