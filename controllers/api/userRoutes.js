// Pseudocode for Express.js route handling user-related actions
const router = require('express').Router();
const { User, Post } = require('../../models');

// Handle POST requests to create a new user
router.post('/', async (req, res) => {
  try {
    // Attempt to create a new user with data from the request body
    const userData = await User.create(req.body);

    // Save user session information upon successful user creation
    req.session.save(() => {
      // Store user data in the session
      // req.session.user_name = userData.name;
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // Respond with a JSON object containing user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // If an error occurs during user creation, respond with a 400 status code and the error details
    res.status(400).json(err);
  }
});

// Handle POST requests to log in a user
router.post('/login', async (req, res) => {
  try {
    // Find a user by email from the request body
    const userData = await User.findOne({ where: { username: req.body.username }, });
    console.log('Received data:', req.body);    

    // If the user is not found, respond with an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the entered password matches the user's stored password
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is not valid, respond with an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username; 
      req.session.logged_in = true;

      res.status(200).json({
        userData,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    // If an error occurs during login, respond with a 400 status code and the error details
    res.status(400).json(err);
  }
});

router.post('/newpost', async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handle POST requests to log out a user
router.post('/logout', (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // If logged in, destroy the session and respond with a 204 status code
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If not logged in, respond with a 404 status code
    res.status(404).end();
  }
});

// Export the router for use in other parts of the application
module.exports = router;