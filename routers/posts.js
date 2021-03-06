import database from '../data/db';

//this is used to inject the DB for testing
var db = database;
function initDB(_db){
  db = _db
}

function getById(id, username){
  var result = null;
  db.posts.forEach(function(post) {
    if (post.id == id){
      if(post.author == username ||
        (!post.private || post.private.toString().toLowerCase() != "true")){
        result = post;
      }
    }
  });
  return result;
}

/*Get all posts to display on dashboard or main page.
It does not include drafts. Drafts can be retrieved by get by id*/
function getPosts(req, res){
  var results = [];
  db.posts.forEach(function(post) {
    if (!post.draft || post.draft.toString().toLowerCase() != "true") {
      if (post.author == req.headers["username"]){
        results.push(post);
      } else if (!post.private){
        results.push(post);
      } else if (post.private.toString().toLowerCase() != "true"){
        results.push(post);
      }
    }
  });
  return res.status(200).send({
    success: 'true',
    message: 'posts retrieved successfully',
    results: results
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
  var result = getById(req.params.id, req.headers['x-access-token']);
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

function addPost(req, res) {
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
    content: req.body.content,
    author: req.headers['username'],
    private: !req.body.private ? false : req.body.private,
    draft: !req.body.draft ? false : req.body.draft
  }
  db.posts.push(newPost);

  return res.status(201).send({
    success: 'true',
    message: 'Post added successfully',
    post: newPost
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
  var result = getById(req.params.id, req.headers['username']);
  if (!result || result.author != req.headers["username"]){
    return res.status(400).send({
      success: 'false',
      message: 'There is any post with given id and username',
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
  var result = getById(req.params.id, req.headers['username']);
  if (!result || result.author != req.headers["username"]){
    return res.status(400).send({
      success: 'false',
      message: 'There is any post with given id and username',
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
    content: req.body.content,
    private: !req.body.private ? false : req.body.private,
    draft: !req.body.draft ? false : req.body.draft,
    author: req.headers["username"]
  }
  db.posts.push(newPost);
  return res.status(201).send({
    success: 'true',
    message: 'Post updated successfully',
    post: newPost
  })
}

function containsText(searchCriteria, text){
  var searchStatements = searchCriteria.toLowerCase().split(' ');
  var result = false;
  searchStatements.forEach(function(word){
    if (text.toLowerCase().includes(word)){
      result = true;
      return true;
    }
  });
  return result;
}

function searchPosts(req, res){
  var results = [];
  if (!req.body.searchText){
    return res.status(400).send({
      success: 'false',
      message: 'It is missing search criteria'
    });
  }

  db.posts.forEach(function(post) {
    if (containsText(req.body.searchText, post.content) ||
        containsText(req.body.searchText, post.title)){
      if (post.author == req.headers["username"]){
        results.push(post);
      } else if (!post.private){
        results.push(post);
      } else if (post.private.toString().toLowerCase() != "true"){
        results.push(post);
      }
    }
  });
  return res.status(200).send({
    success: 'true',
    message: 'posts retrieved successfully',
    results: results
  });
}

module.exports = { initDB, getPosts, addPost, deletePost, getPost, updatePost, searchPosts };
