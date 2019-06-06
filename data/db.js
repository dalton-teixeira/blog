import bcrypt from 'bcrypt';
const  posts =  [
    {
      id: 1,
      title: "Hello",
      content: "Hello everyone,as you may know this is a test application.",
      private: false,
      author: 'dalton',
      draft: false
    }
];

const  users =  [
    {
      username: 'dalton',
      nickname: "d4lton",
      password: bcrypt.hashSync('password', 10),
      email: 'dalton@mail.com'
    }
];

module.exports = { posts, users }
