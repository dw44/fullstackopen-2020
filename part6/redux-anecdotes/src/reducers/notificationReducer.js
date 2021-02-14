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

// added for 6.21
let hideNotificationTimer;

// added for 6.18
// updated for 6.21
export const setNotification = (content, time) => async (dispatch) => {
  clearTimeout(hideNotificationTimer);

  const delayedClear = (time) => {
    hideNotificationTimer = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: '',
      });
    }, time);
  };

  dispatch({
    type: 'SET_NOTIFICATION',
    data: content,
  });

  await delayedClear(time);
};

export default notificationReducer;
