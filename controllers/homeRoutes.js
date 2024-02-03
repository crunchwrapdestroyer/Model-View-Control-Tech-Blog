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

router.get('/post/:id', async (req,res) => {
try {
  const postId = req.params.id;
    // Fetch the post by ID from the database
    const post = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    console.log(post)
    console.log(post.get({ plain: true }))
  res.render('post', { post: post.get({ plain: true })});
} catch (err) {
  console.error(err);
    res.status(500).render('error500');
}
})

router.get('/login', async (req, res) => {
  try { 
// data to be requested 
    res.render('login')
  } catch (err) {
    res.status(500).json(err); // error handling
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
