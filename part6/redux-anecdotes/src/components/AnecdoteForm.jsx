import { createAnecdote } from '../reducers/anecdoteReducer';

// seperated into it's own component for 6.7
const AnecdoteForm = ({ dispatch }) => {
  // created for 6.4, moved here for 6.7
  const newAnecdote = (event) => {
    event.preventDefault();
    const data = event.target.anecdote.value;
    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';
    dispatch(createAnecdote(data));
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
