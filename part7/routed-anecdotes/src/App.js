/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { useState, useEffect, useRef } from 'react';
import {
  Link, Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';

import { useField } from './hooks/index';

// updated for 7.1
const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."
    </em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for
    {' '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">Full Stack -websovelluskehitys</a>
    .

    See
    {' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a>
    {' '}
    for the source code.
  </div>
);

// updated for 7.4
// updated for 7.5
// updated for 7.6
const CreateNew = ({ addNew, showNotification }) => {
  const [author, clearAuthor] = useField('text');
  const [content, clearContent] = useField('text');
  const [info, clearInfo] = useField('text');
  // added for 7.3
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);

  // updated for 7.3
  // updated for 7.4
  // updated for 7.5x
  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    showNotification(`Submitted anecdote "${content.value}"`);
    setSubmitted(!submitted);
  };

  // updated for 7.6
  const resetForm = () => {
    clearAuthor();
    clearContent();
    clearInfo();
  };

  // updated for 7.5
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="new-anecdote" ref={formRef} onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button type="reset" onClick={resetForm}>clear all</button>
      </form>
      {submitted ? <Redirect to="/" /> : null}
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  console.log(anecdote);
  return (
    <div>
      <p>
        <strong>Content:&nbsp;</strong>
        {anecdote.content}
      </p>
      <p>
        <strong>Author:&nbsp;</strong>
        {' '}
        {anecdote.author}
      </p>
      <p>
        <strong>Info:&nbsp;</strong>
        {anecdote.info}
      </p>
      <p>
        <strong>Votes:&nbsp;</strong>
        {anecdote.votes}
      </p>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  // added for 7.2
  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match ? anecdotes.find((anecdote) => anecdote.id === match.params.id) : null;

  const [notification, setNotification] = useState('');

  // added for 7.3. The notification is set by the form which redirects here
  // the useeffect hook clears any notification 10 sec after it's set
  useEffect(() => {
    setTimeout(() => {
      setNotification('');
    }, 10000);
  }, [notification]);

  const addNew = (anecdote) => {
    // eslint-disable-next-line no-param-reassign
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  // updated for 7.2
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <h1>{notification.length ? notification : null}</h1>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} showNotification={setNotification} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
