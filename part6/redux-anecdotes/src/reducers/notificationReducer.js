// created for 6.10
// updatef for 6.11
const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'REMOVE_NOTIFICATION':
    return '';
  case 'VOTE_NOTIFICATION':
    return `You voted for "${action.data}"`;
  case 'NEW_ANECDOTE_NOTIFICATION':
    return `You added anecdote: "${action.data}"`;
  default:
    return state;
  }
};

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
});

export const voteNotification = (data) => ({
  type: 'VOTE_NOTIFICATION',
  data,
});

export const newAnecdoteNotification = (data) => ({
  type: 'NEW_ANECDOTE_NOTIFICATION',
  data,
});

export default notificationReducer;
