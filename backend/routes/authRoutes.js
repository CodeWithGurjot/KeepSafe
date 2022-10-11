const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser');

//ROUTE:1 Create a User using: POST "/api/v1/auth/createuser"  #User Logged in not required
router.post('/createuser',
  //Validations using express-validator
  [
    body('name', 'Name must contain atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain atleast 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    
    try {
      //Unique Email Check
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        res.status(400).json({success, error: 'User already exists' })
      } else {
        //Hashing the password
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Creating new user in Mongo database
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        })

        const data = {
          user: {
            _id: user._id,
          },
        }
        //Sending Authentication Token to user
        success = true;
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        res.json({success, authtoken: authToken })
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
      res.status(500).send('Internal server error')
      process.exit()
    }
  },
)

//ROUTE:2 Authenticate a User using: POST "/api/v1/auth/login" #User Logged in not required
router.post(
  '/login',
  //Validations using express-validator
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password field cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() })
    }

    const { email, password } = req.body

    //Checking user credentials with database
    try {
      let user = await User.findOne({ email })
      if (!user) {
        res.status(400).json({success, error: 'Please try again with correct credentials' })
      } else {
        //Comparing password hasses with bcrypt
        const passCheck = await bcrypt.compare(password, user.password)
        if (!passCheck) {
          res.status(400).json({success, error: 'Please try again with correct credentials' })
        } else {
          const data = {
            user: {
              _id: user._id,
            },
          }
          //Sending Authentication Token to user
          success = true;
          const authToken = jwt.sign(data, process.env.JWT_SECRET)
          res.json({success, authtoken: authToken })
        }
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
      res.status(500).send('Internal server error')
      process.exit()
    }
  },
)

//ROUTE:3 Get details of logged in user using: POST "/api/v1/auth/getuser" #User Logged in required
//Used a middleware 'fetchuser' to check the token sent by user
router.post('/getuser', fetchuser, async (req, res) => {
    try {
      const userId= req.user._id;
      const user = await User.findById(userId).select('-password')
      res.send(user);
    } catch (error) {
      console.log(`Error: ${error.message}`)
      res.status(500).send('Internal server error')
      process.exit()  
    }
  }
)

//jwttokens are stored in clients system. They allow user to perform all the tasks they want without logging in again and again
//We can also use Session tokens(cookies) instead of Json Web Tokens

module.exports = router
