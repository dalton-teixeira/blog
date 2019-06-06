import config from './config';
import posts from './routers/posts';
import auth from './routers/auth';
import express from 'express';
import bodyParser from 'body-parser';
import db from './data/db';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({message: "Welcome to my blog!"}));
app.set('secretKey', 'mysecrect');
app.route("/posts")
  .get(auth.validate, posts.getPosts)
  .post(auth.validate, posts.addPost)
app.route("/posts/:id")
  .get(auth.validate, posts.getPost)
  .delete(auth.validate, posts.deletePost)
  .put(auth.validate, posts.updatePost);
app.route("/auth")
  .post(auth.login);
app.route("/searchPosts")
  .post(auth.validate, posts.searchPosts);
  
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

module.exports = app
