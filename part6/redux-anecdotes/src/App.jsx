import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

// updated for 6.5 to sort by number of votes
// updated for 6.12 to incorporate filter functionality4
// updated for 6.15
// updated for 6.19
const App = () => {
  const dispatch = useDispatch();

  // updated for 6.15
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  // updated for 6.7
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  );
};

export default App;
