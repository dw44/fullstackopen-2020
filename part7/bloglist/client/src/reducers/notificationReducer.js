// created for 7.9
const notificationReducer = (state = [null, 0], action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return [...action.data];
  default:
    return state;
  }
};

// to control hiding notifications after timer expires
let hideNotificationTimer;

export const setNotification = (content, time) => async (dispatch) => {
  clearTimeout(hideNotificationTimer);

  const delayedClear = (time) => {
    hideNotificationTimer = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: [null, 0],
      });
    }, time);
  };

  dispatch({
    type: 'SET_NOTIFICATION',
    data: [...content],
  });

  await delayedClear(time);
};

export default notificationReducer;
