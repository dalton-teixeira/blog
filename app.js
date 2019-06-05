import express from 'express';
import posts from './data/db';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/posts', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'posts retrieved successfully',
    posts: posts
  })
});

app.post('/api/v1/posts', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is mandatory',
      body: req.body
    });
  } else if(!req.body.content) {
    return res.status(400).send({
      success: 'false',
      message: 'content is mandatory'
    });
  }
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  }
  posts.push(newPost);

  return res.status(201).send({
    success: 'true',
    message: 'Post added successfully',
    newPost
  })
});

app.delete('/api/v1/posts', (req, res) => {
  if(!req.body.id) {
    return res.status(400).send({
      success: 'false',
      message: 'Id is mandatory',
      body: req.body
    });
  }
  var removedPost = null;
  posts.forEach(function(post) {

    if (post.id == req.body.id){
      removedPost = post;
      posts.splice(posts.indexOf(post));
    }
  });

  if (!removedPost){
    return res.status(400).send({
      success: 'false',
      message: 'There is any post with given id',
      body: req.body
    });
  }
  
  return res.status(201).send({
    success: 'true',
    message: 'Post removed successfully',
    removed: removedPost
  })
});


const PORT = 5400;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
