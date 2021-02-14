// added for 6.19
import { connect } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({
  anecdotes, filter, voteAnecdote, setNotification,
}) => {
  // updated for 6.3. moved here for 6.8
  // updated for 6.11
  // updated for 6.18
  // updated for 6.19
  const vote = (id, content) => {
    voteAnecdote(id);
    setNotification(
      `Voted for anecdote "${content}"`,
      3000,
    );
  };

  // refactored and renamed for 6.19
  const anecdotesToShow = () => {
    if (filter.length) return anecdotes;
    return anecdotes
      .filter((anecdote) => anecdote.content.includes(filter))
      .sort((anecA, anecB) => anecB.votes - anecA.votes);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow().map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has
            {' '}
            {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// added for 6.19
const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
});

// added for 6.19
const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

// updated for 6.19
const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);

export default ConnectedAnecdotes;
