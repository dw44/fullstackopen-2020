// created for 6.10
// updated for 6.11
// updated for 6.18
const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data;
  default:
    return state;
  }
};

// added for 6.18
export const setNotification = (content, time) => async (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: content,
  });
  await setTimeout(() => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: '',
    });
  }, time);
};

export default notificationReducer;
