const router = require('express').Router();
const {User, Post} = require('../models');
// const withAuth = require('../utils/auth');
// const { withGuard, withoutGuard } = require('../utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try { 
// data to be requested 
    res.render('login')
  } catch (err) {
    res.status(500).json(err); // error handling
  }
});
router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/editpost', async (req, res) => {
  try {
    res.render('editpost')
  } catch (err) {
    res.status(500).json(err);
  }})
router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
