import { useEffect, useState} from "react"
//components
import WorkoutDetails from "../components/WorkoutDetails"
import Workoutform from "../components/Workoutform"


const Home = () => {

    const [workouts, setWorkouts] = useState()
    
    async function fetchWorkouts(){
        const res = await fetch('https://workouts-server-lr4l.onrender.com/api/workouts')
        const data = await res.json()
        if(res.ok){
            setWorkouts(data)
        }
        console.log(res, data);
    }

    useEffect(() =>{
        fetchWorkouts()
    }, [])

    return(
        <div className="home">
           <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} fetchWorkouts={fetchWorkouts} />
                ))}
           </div>
           <Workoutform fetchWorkouts={fetchWorkouts}/>
        </div>
    )
}

export default Home