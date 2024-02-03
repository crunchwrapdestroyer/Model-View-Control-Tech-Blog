const router = require('express').Router();
const { Post } = require('../models');
const { withGuard } = require('../utils/authGuard');

router.get('/', withGuard, async (req, res) => {  
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

  module.exports = router;