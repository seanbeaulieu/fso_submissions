const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentValue) => 
      accumulator + currentValue.exercises, 0,
)
  return (
    <div> 
      total of {total} exercises
    </div>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
      {parts.map(part => 
          <div key={part.id}>
          <Part part={part} />
          </div>        
      )}
  </>

const Course = (props) => 
  <>
    <Header course={props.course.name} />
  
    <Content parts={props.course.parts} />

    <Total parts={props.course.parts} />
    
  </>

export default Course