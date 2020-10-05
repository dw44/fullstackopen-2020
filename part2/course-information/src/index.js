import React from 'react';
import ReactDOM from 'react-dom';
import Course from './Components/Course';
import './index.css';


// refactored for exercise 2.4 
const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 13,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Server Side Development',
      parts: [
        {
          name: 'Node.js',
          exercises: 10,
          id: 1
        },
        {
          name: 'Express.js',
          exercises: 10,
          id: 2
        },
        {
          name: 'Integrating Databases',
          exercises: 5,
          id: 3
        }
      ]
    }
  ];
  
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => 
        <Course course={ course } key={ course.id } />
      )}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
