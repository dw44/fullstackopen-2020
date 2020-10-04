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
  props.parts.map(part => <Part key={ Math.floor(Math.random() * 10000000) } title={ part.title } exerciseCount={ part.exercises } />)
);

// "Total" component for exercise 1.1
const Total = props => (
  <p>
    Number of exercises { props.exerciseCounts.reduce((a, b) => a + b, 0) }
  </p>
);

const App = () => {
  const course = 'Half Stack application development';
  const courseParts = [
    { title: 'Fundamentals of React', exercises: 10 },
    { title: 'Using props to pass data', exercises: 7 },
    { title: 'State of a component', exercises: 14 }
  ];

  return (
    <div>
      <Header courseName={ course } />
      <Content parts={ courseParts } />
      <Total exerciseCounts={ courseParts.map(part => part.exercises) } />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
