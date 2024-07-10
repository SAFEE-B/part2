const Header = ({ course }) => {
    return (
      <h2>{course}</h2>
    );
  }
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    );
  }
  
  const Content = ({ props }) => {
    return (
      <>
      {props.map((part,id) => <Part part={part} key={id} />)}
      </>
    );
  }
  
  const Total = ({part}) => {
    const total=part.reduce((total,current)=> {return total+=current.exercises},0)
    return (
      <h3>Number of Exercises {total}</h3>
    );
  }
  const Course=({course})=>{
    return (
      <> 
      <Header course={course.name} />
      <Content props={course.parts}/>
      <Total part={course.parts}/>
  </>
    )
  }

export default Course