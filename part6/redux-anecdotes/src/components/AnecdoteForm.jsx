import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

// seperated into it's own component for 6.7
// updated for 6.11
// updated for 6.13/6.14
const AnecdoteForm = ({ dispatch }) => {
  // created for 6.4, moved here for 6.7
  // updated for 6.14
  // updated for 6.16
  // updated for 6.18
  const newAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(setNotification(
      `Added anecdote "${content}"`,
      4000,
    ));
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
