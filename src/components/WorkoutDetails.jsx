import React from 'react'

const WorkoutDetails = ({workout, fetchWorkouts}) => {

  async function handleClick() {
    const response = await fetch(`https://workouts-server-lr4l.onrender.com/api/workouts/${workout._id}`,{
      method:'DELETE'
    })
    if (response.ok) {
      fetchWorkouts()
      alert('Workout sucessfully deleted')
    }
  }

  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
        <button onClick={handleClick}> DELETE</button>
    </div>
  )
}

export default WorkoutDetails