const Workout = require("../models/Workout")
//get all workout
const getWorkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req,res)=>{
    const {id} = req.params
    // check = mongoose.types.ObjectId.isValid(id)
    const workout = await Workout.findById(id);
    if(!workout){
        return res.status(400).json({mssg:"Workout not available"})
    }
    res.status(200).json(workout)
}

//create workout
const createWorkout = async (req,res)=>{
    const {title,load,reps} = req.body
    try{
        const workout =await Workout.create({title,reps,load})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({mssg:error.message})
        console.log(error)
    }
}
//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findOneAndDelete({ _id: id });

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({ message: "Workout deleted successfully", id: workout._id });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//update workout 
const updateWorkout = (req,res)=>{
    const{id} = req.params
    const workout = Workout.findOneAndUpdate({_id:id},{...req.body})
    if(!workout){
        return res.status(400).json({mssg:"Workout not available"})
    }
    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}