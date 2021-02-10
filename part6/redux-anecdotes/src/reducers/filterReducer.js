// added for 6.12
const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'UPDATE_FILTER':
    return action.data;
  default:
    return state;
  }
};

export const updateFilter = (data) => ({
  type: 'UPDATE_FILTER',
  data,
});

export default filterReducer;
