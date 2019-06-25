const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project-model'); //PROJECT
const Task = require('../models/task-model');  //TASK

router.post("/projects", (req, res, next) => {

  //const taskarray= Array.from(req.body.tasks);

 

    Project.create({
      title: req.body.title,
      description: req.body.description,
      tasks: []
    })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      })

});


router.get("/projects", (req, res, next) => {
  Project.find().populate('tasks')
  .then(allProjects => {
  console.log('Retrieved all allProjects from DB:', allProjects);
  res.json(allProjects);

  })
  .catch(err => {
    res.json(err);
  })
});


router.get("/projects/:id",(req, res) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our projects have array of tasks' ids and 
  // we can use .populate() method to get the whole task objects
  //                                   ^
  //                                   |
  //                                   |
  Project.findById(req.params.id).populate('tasks')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })

});


router.put('/projects/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


router.delete('/projects/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = router;
