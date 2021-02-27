// created for 7.12
const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data !== null ? { ...action.data } : null;
  default:
    return state;
  }
};

export const setUser = (data) => ({
  type: 'SET_USER',
  data,
});

export default userReducer;
