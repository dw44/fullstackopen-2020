/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */

const getId = () => (100000 * Math.random()).toFixed(0);

// Updated for 6.3
// Updated for 6.4
// Updated for 6.13
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE_ANECDOTE':
    const { id } = action.data;
    const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
    return state.map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote));
  case 'CREATE_ANECDOTE':
    return [...state, action.data];
  case 'INITIALIZE_ANECDOTES':
    return state;
  default:
    return state;
  }
};

// action creator for 6.3
// needed for 6.6. already done
export const voteAnecdote = (id) => ({
  type: 'VOTE_ANECDOTE',
  data: { id },
});

// action creator for 6.4
// needed for 6.6. already done
export const createAnecdote = (content) => ({
  type: 'CREATE_ANECDOTE',
  data: {
    content,
    id: getId(),
    votes: 0,
  },
});

// added for 6.13
export const initializeAnecdotes = (data) => ({
  type: 'INITIALIZE_ANECDOTES',
  data,
});
export default reducer;
