// posts.js                                    //
// All routes directly related to our '/posts' //
const express = require('express');
const router = express.Router();
const Post = require('./../models/post');

// Relative to '/posts' route in server.js
router.get('/new', (req, res) => {
  res.render('posts/new', { post: new Post() });
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if(post == null) {
    res.redirect('/');
  }
  res.render('posts/show', { post: post });
});

router.post('/', async (req, res) => {
  let post = new Post({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    markdown: req.body.markdown
  });

  try {
    post = await post.save();
    res.redirect(`/posts/${post.slug}`);
  } catch(e) {
    console.log(e);
    res.render('posts/new', { post: post });
  }
});

router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;