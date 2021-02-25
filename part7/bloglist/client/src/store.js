// store initialized for 7.9
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';

// added for 7.10 to include blogReducer
const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
