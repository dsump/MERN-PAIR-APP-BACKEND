const express = require("express")

const router = express.Router()

const Activity = require('../models/activity')

//Get all activities -GET 
router.get('/', async (req, res, next) => {
    try{
        const activities = await Activity.find({})
        res.json(activities)
    }catch(err){
        next(err)
    }
})


// Create new activity - POST 
router.post('/', async (req, res, next )=>{
    try{
        const newActivity= await Activity.create(req.body)
    res.status(201).json(newActivity)
    }catch(err){
        next(err)
    }
    
})
//if we consolelog(req.body) we should be able to see whatever was input to our form in the backend console

// Update activity by id  - PUT 
router.put('/:id', async (req, res, next)=> {
    const activityToUpdate = await Activity.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(activityToUpdate){
        res.json(activityToUpdate)
    }else {
        res.sendStatus(404)
    }
        
})


//Delete an activity by id - DELETE
router.delete("/:id", async (req, res, next) => {
    try{
        const activityToDelete = await Activity.findByIdAndDelete(req.params.id)
        if (activityToDelete) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
})


module.exports = router