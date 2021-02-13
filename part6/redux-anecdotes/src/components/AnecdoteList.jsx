import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ anecdotes, dispatch }) => {
  // updated for 6.3. moved here for 6.8
  // updated for 6.11
  // updated for 6.18
  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(
      `Voted for anecdote "${content}"`,
      3000,
    ));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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

export default AnecdoteList;
