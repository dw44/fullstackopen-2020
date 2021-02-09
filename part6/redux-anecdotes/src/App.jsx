import { useSelector, useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  // updated for 6.5 to sort by number of votes
  const anecdotes = useSelector((state) => state)
    .sort((anecA, anecB) => anecB.votes - anecA.votes);
  const dispatch = useDispatch();

  // updated for 6.7
  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} dispatch={dispatch} />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  );
};

export default App;
