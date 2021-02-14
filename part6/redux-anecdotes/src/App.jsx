import { useEffect } from 'react';
import { connect } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

// updated for 6.5 to sort by number of votes
// updated for 6.12 to incorporate filter functionality4
// updated for 6.15
// updated for 6.19
const App = ({ initializeAnecdotes }) => {
  // updated for 6.15
  useEffect(() => {
    initializeAnecdotes();
  }, [connect]);

  // updated for 6.7
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

const mapDispatchToProps = {
  initializeAnecdotes,
};

const ConnectedApp = connect(
  null,
  mapDispatchToProps,
)(App);
export default ConnectedApp;
