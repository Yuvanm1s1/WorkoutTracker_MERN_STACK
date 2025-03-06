require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
//import package
const workoutRoutes = require('./routes/workouts')
//app
const app = express()
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})


//routs
// app.get('/',(req,res)=>{
//     res.json({mssg:"Welcome to the app"})
// })

app.use('/api/workouts',workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen req
    app.listen(process.env.PORT , ()=>{
    console.log('connected to mongoDB and listening on port ',process.env.PORT)
})
    })
    .catch((error)=>{
        console.log(error)
    })

