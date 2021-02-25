import blogService from '../services/blogs';

export default function blogReducer(state = [], action) {
  switch (action.type) {
  case 'INITIALIZE_BLOGLIST':
    return [...action.data];
  default:
    return state;
  }
}

// fetching data from DB at app load to initialize blogs array
export const initializeBlogList = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INITIALIZE_BLOGLIST',
    data: [...blogs],
  });
};
