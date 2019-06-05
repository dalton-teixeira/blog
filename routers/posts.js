import db from '../data/db';

function getById(id){
  var result = null;
  db.posts.forEach(function(post) {
    if (post.id == id){
      result = post;
    }
  });
  return result;
}

function getPosts(req, res) {
  res.status(200).send({
    success: 'true',
    message: 'posts retrieved successfully',
    posts: db.posts
  });
}

function getPost(req, res) {
  if(!req.params.id) {
    return res.status(400).send({
      success: 'false',
      message: 'Id is mandatory',
      params: req.params
    });
  }
  var result = getById(req.params.id);
  if (!result){
    return res.status(400).send({
      success: 'false',
      message: 'There is any post with given id',
      id: req.params.id
    });
  }
  return res.status(200).send({
    success: 'true',
    message: 'Post found.',
    post: result
  })
}

function putPost(req, res) {
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
    id: db.posts.length + 1,
    title: req.body.title,
    content: req.body.content
  }
  db.posts.push(newPost);

  return res.status(201).send({
    success: 'true',
    message: 'Post added successfully',
    newPost
  })
}

function deletePost(req, res) {
  if(!req.params.id) {
    return res.status(400).send({
      success: 'false',
      message: 'Id is mandatory',
      params: req.params
    });
  }
  var result = getById(req.params.id);
  if (!result){
    return res.status(400).send({
      success: 'false',
      message: 'There is any post with given id',
      id: req.params.id
    });
  }
  db.posts.splice(db.posts.indexOf(result), 1);
  return res.status(201).send({
    success: 'true',
    message: 'Post removed successfully',
    removed: result
  })
}

function updatePost(req, res) {
  if(!req.params.id) {
    return res.status(400).send({
      success: 'false',
      message: 'Id is mandatory',
      params: req.params
    });
  }
  var result = getById(req.params.id);
  if (!result){
    return res.status(400).send({
      success: 'false',
      message: 'There is any post with given id',
      id: req.params.id
    });
  }
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
  db.posts.splice(db.posts.indexOf(result), 1);
  const newPost = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content
  }
  db.posts.push(newPost);
  return res.status(201).send({
    success: 'true',
    message: 'Post updated successfully',
    removed: newPost
  })
}


module.exports = { getPosts, putPost, deletePost, getPost, updatePost };
