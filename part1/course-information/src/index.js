import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// "Header" component for exercise 1.1
const Header = props => (
  <h1>{ props.courseName }</h1>
);

// "Part" component for exercise 1.2
const Part = props => (
  <p>
    { props.title } { props.exerciseCount }
  </p>
);

// "Content" component refactored for exercise 1.2
const Content = props => (
  props.parts.map( part => <Part 
    key={ Math.floor( Math.random() * 10000000 ) } 
    title={ part.name } 
    exerciseCount={ part.exercises } />
  )
);

// "Total" component refactored for exercise 1.4
const Total = props => (
  <p>
    Number of exercises { props.exerciseCount }
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
