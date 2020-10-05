import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// refactored to get courseName prop through destructuring
const Header = ({ courseName }) => (
  <h1>{ courseName }</h1>
);

// refactored to get title and exerciseCount props through destructuring
const Part = ({ title, exerciseCount }) => (
  <p>
    { title } { exerciseCount }
  </p>
);

// refactored to get parts prop through destructuring
const Content = ({ parts }) => (
  parts.map(part => <Part 
    key={ Math.floor( Math.random() * 10000000 ) } 
    title={ part.name } 
    exerciseCount={ part.exercises } />
  )
);

// refactored to get exerciseCount prop through destructuring
const Total = ({ exerciseCount }) => (
  <p>
    Number of exercises { exerciseCount }
  </p>
);

// "App" component refactored for exercise 1.5
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header courseName={ course.name } />
      <Content parts={ course.parts } />
      <Total exerciseCount={ course.parts.reduce((a, b) => a + b.exercises, 0) } />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
