const router = require('express').Router();
const {User, Post} = require('../models');
// const withAuth = require('../utils/auth');
const { withGuard } = require('../utils/authGuard');

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
router.get('/dashboard', withGuard, async (req, res) => {  
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/newPost', (req, res) => {
  try {
    res.render('newPost');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  try {
    // Destroy the user session
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json(err);
        res.redirect('/login')
      } else {
        // Redirect the user to the homepage or login page
        res.redirect('/');
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
