import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id}  part={part} />
          )}
      </div>
    )
}

const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
}


const Total = ({ course }) => {
    const exercises = course.parts.map(part =>
      part.exercises
      )
    return(
      <p><b>total of {exercises.reduce((a,b) => a + b)} exercises</b></p>
    ) 
}

export default Course


  