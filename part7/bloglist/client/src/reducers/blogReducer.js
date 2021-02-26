import { cloneDeep } from 'lodash';
import blogService from '../services/blogs';

export default function blogReducer(state = [], action) {
  switch (action.type) {
  case 'INITIALIZE_BLOGLIST':
    return cloneDeep(action.data);
  case 'ADD_BLOG':
    return cloneDeep(state).concat(cloneDeep(action.data));
  case 'LIKE_BLOG':
    // added for 7.11 to handle likes
    return state.map((blog) => (blog.id === action.data.id
      ? cloneDeep(action.data)
      : cloneDeep(blog)));
  default:
    return cloneDeep(state);
  }
}

// added for 7.10
// fetching data from DB at app load to initialize blogs array
export const initializeBlogList = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INITIALIZE_BLOGLIST',
    data: [...blogs],
  });
};

// added for 7.10
export const addBlog = (data) => ({
  type: 'ADD_BLOG',
  data,
});

export const likeBlog = (data) => ({
  type: 'LIKE_BLOG',
  data,
});