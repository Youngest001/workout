import { useState } from "react"

const Workoutform = ({fetchWorkouts}) =>{

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])



    const handleSubmit = async (e) =>{
        e.preventDefault()
        const workout ={title, load, reps}
        console.log(workout);
        

        if(workout.title === '' || workout.load === '' || workout.reps === ''){
            alert("Fill in the fields")
        }else{

            const response = await fetch('https://workouts-server-lr4l.onrender.com/api/workouts',{
                method:'POST',
                body: JSON.stringify(workout),
                headers: {
                    'content-type':'application/json'
                }
    
            })
    
            const json = await response.json()
            console.log(response, json);
            
            if (!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
            if (response.ok) {
                fetchWorkouts()
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
            }
        }
    }

    return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New workout</h3>

        <label>Exercise Title</label>
        <input
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error': ''} 
        />

       
        <label>Load(in kg)</label>
        <input
            type="number" 
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error': ''} 
        />

        
        <label>Reps</label>
        <input
            type="number" 
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error': ''} 
        />
        <button>Add workout</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default Workoutform