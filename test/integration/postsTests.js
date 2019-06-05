
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Manage Posts', () => {
  var postId = null;
  var newPostBody = {
    title: "Post one",
    content: "bla bla bla"
  };
  var modifiedPostBody = {
    title: "Post Two",
    content: "Modified"
  };
  
  describe('Add a post retrieving it afterwards', () => {
      it('it should add a post', (done) => {
        chai.request(server)
          .post('/posts')
          .send(newPostBody)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('post');
            res.body.post.should.have.property('title').eql(newPostBody.title);
            res.body.post.should.have.property('content').eql(newPostBody.content);
            res.body.post.should.have.property('id');
            postId = res.body.post.id;
            done();
          });
      });
      it('it should retrieve the post', (done) => {
        chai.request(server)
          .get(`/posts/${postId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('post');
            res.body.post.should.have.property('title').eql(newPostBody.title);
            res.body.post.should.have.property('content').eql(newPostBody.content);
            done();
          });
      });
  });

  describe('Update a post retrieving it afterwards', () => {
      it('it should update the post', (done) => {
        chai.request(server)
          .put(`/posts/${postId}`)
          .send(modifiedPostBody)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('post');
            res.body.post.should.have.property('title').eql(modifiedPostBody.title);
            res.body.post.should.have.property('content').eql(modifiedPostBody.content);
            done();
          });
      });
      it('it should retrieve the modified post', (done) => {
        chai.request(server)
          .get(`/posts/${postId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('post');
            res.body.post.should.have.property('title').eql(modifiedPostBody.title);
            res.body.post.should.have.property('content').eql(modifiedPostBody.content);
            done();
          });
      });
  });

  describe('Delete a post trying retrieving it afterwards', () => {
      it('it should delete the post', (done) => {
        chai.request(server)
          .delete(`/posts/${postId}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('removed');
            done();
          });
      });
      it('it should not retrieve the modified post', (done) => {
        chai.request(server)
          .get(`/posts/${postId}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('There is any post with given id');
            done();
          });
      });
  });
});
