/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
import anecdoteService from '../services/anecdoteService';

// Updated for 6.3
// Updated for 6.4
// Updated for 6.13
// Updated for 6.14
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
    return action.data;
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
// updated for 6.14
// updated for 6.16
export const createAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.createNew(content);
  console.log(anecdote);
  dispatch({
    type: 'CREATE_ANECDOTE',
    data: anecdote,
  });
};

// added for 6.13
// updated for 6.15 to work asynchronously with thunk
export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes,
  });
};

export default reducer;
