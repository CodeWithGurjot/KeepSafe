const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//ROUTE:1 Fetching all the notes of logged in user using: GET "/api/v1/notes/fetchallnotes"  #User Logged in required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id })
    res.json(notes)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    res.status(500).send('Internal server error')
    process.exit()
  }
})

//ROUTE:2 Add a new note using: GET "/api/v1/notes/addnote"  #User Logged in required
router.post(
  '/addnote',
  fetchuser,
  //Using express-validator to valid content
  [
    body('title', 'Must conatin a value').exists(),
    body('description', 'Must conatin a value').exists(),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      //Adding a new note to mongoDB
      note = await Notes.create({
        user: req.user._id, //getting user id from fetchuser and jwt
        title: title,
        description: description,
      })
      //Sending new note to the user
      res.json(note)
    } catch (error) {
      console.log(`Error: ${error.message}`)
      res.status(500).send('Internal server error')
      process.exit()
    }
  },
)

//ROUTE:3 Update an existing note using: PUT "/api/v1/notes/updatenote/:id"  #User Logged in required
router.put('/updatenote/:id',
  fetchuser,
  //Using express-validator to valid content
  [
    body('title', 'Must conatin a value').exists(),
    body('description', 'Must conatin a value').exists(),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body
      //Create new note object
      const newNote = {};
      //Adding data to new note
      if (title) {
        newNote.title = title
      }
      if (description) {
        newNote.description = description
      }

      //Find the to be updated and update it
      let note = await Notes.findById(req.params.id);
      //Checking user authorization by comparing jwt
      if(note.user.toString() !== req.user._id){
        return res.status(401).send("No Authorization");

        //Checking for the file in database
      } else if(!note){
        res.status(404).send("File not found");
      } else {
        note = await Notes.findByIdAndUpdate(note._id, {$set: newNote}, {new: true})
        res.json({note});
      }

    } catch (error) {
      console.log(`Error: ${error.message}`)
      res.status(500).send('Internal server error')
      process.exit()
    }
  },
)

//ROUTE:4 Deleting note using: DELETE "/api/v1/notes/deletenote/:id"  #User Logged in required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
      //Find the to be updated and update it
      let note = await Notes.findById(req.params.id);
      if(note.user.toString() !== req.user._id){
        return res.status(401).send("No Authorization");
      } else if(!note){
        res.status(404).send("File not found");
      } else {
        note = await Notes.findByIdAndDelete(note._id)
        res.send("Deleted...!!!");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
      res.status(500).send('Internal server error')
      process.exit()
    }
  })

module.exports = router
