import posts from '../../routers/posts';
import ResMock from './mocks/resMock'
import chai from 'chai';
should = chai.should();
let should = chai.should();

describe('Manage Posts - Unit Tests', () => {
  var postId = null;
  var newPostBody = {
    title: "Post one",
    content: "bla bla bla"
  };
  var modifiedPostBody = {
    title: "Post Two",
    content: "Modified"
  };

  describe('Add a post', () => {
    it('it should add a post successfully', (done) => {
      let res = new ResMock();
      let req = {
        body: {
          title: 'stubbed title',
          content: "bla bla",
        },
        headers: {'username': 'dalton'}
      }
      var testDB = {posts:  []};
      posts.initDB(testDB);
      let result = posts.addPost(req, res);
      result._status.should.be.eql(201);
      result.sendCalledWith.should.have.property('success').eql('true');
      result.sendCalledWith.should.have.property('message').eql('Post added successfully');
      result.sendCalledWith.should.have.property('post');
      result.sendCalledWith.post.should.have.property('id').eql(1);
      done();
    });
    it('it should add a post missing title', (done) => {
      let res = new ResMock();
      let req = {
        body: {
          content: "bla bla"
        }
      }
      var testDB = {posts:  []};
      posts.initDB(testDB);
      let result = posts.addPost(req, res);
      result._status.should.be.eql(400);
      result.sendCalledWith.should.have.property('success').eql('false');
      result.sendCalledWith.should.have.property('message').eql('title is mandatory');
      done();
    });
  });
});
