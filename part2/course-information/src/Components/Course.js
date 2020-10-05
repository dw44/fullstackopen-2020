import React from 'react';

// refactored for exercise 2.1
const Header = ({ name }) => {
  return (
    <h2>{ name }</h2>
  )
}

// refactored for exercise 2.3
const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return(
    <p>Total Number of Exercises : { total }</p>
  ) 
}

// refactored for exercise 2.1
const Part = ({ part }) => {
  return (
    <p>
      { part.name } : { part.exercises }
    </p>    
  )
}

// refactored for exercise 2.1
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part part={ part } key={ part.id } />
      )}
    </div>
  )
}

// Course component created for exercise 2.1
const Course = ({ course }) => {
  return (
    <div>
      <Header name={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  );
}

export default Course;