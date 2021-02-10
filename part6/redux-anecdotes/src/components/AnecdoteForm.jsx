import { createAnecdote } from '../reducers/anecdoteReducer';
import { newAnecdoteNotification, removeNotification } from '../reducers/notificationReducer';

// seperated into it's own component for 6.7
// updated for 6.11
const AnecdoteForm = ({ dispatch }) => {
  // created for 6.4, moved here for 6.7
  const newAnecdote = (event) => {
    event.preventDefault();
    const data = event.target.anecdote.value;
    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';
    dispatch(createAnecdote(data));
    dispatch(newAnecdoteNotification(data));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
