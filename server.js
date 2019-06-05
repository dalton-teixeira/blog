import config from './config';
import posts from './routers/posts';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({message: "Welcome to my blog!"}))

app.route("/posts")
  .get(posts.getPosts)
  .post(posts.putPost)
app.route("/posts/:id")
  .get(posts.getPost)
  .delete(posts.deletePost)
  .put(posts.updatePost);
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
