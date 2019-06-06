# blog
It is a experimental exercise on NodeJS and Express

### To install all required dependencies use:

    npm install

### To start the rest API:

    npm start

### To run integration and unit tests:

    npm run test

In order to run tests the rest API must be down.


It creates lists, deletes, updates and retrieves post.

It authenticates the user and all operations are allows only if it is logged in.

### Security
It uses JWT authentication.

### Portablity
The application port is configured in config.js
Any other environment configuration canbe added yo this file.

## API

### /auth
Used for logging in.
Usage:
Method Post.
post body:

    {
        "username":<username>,
	"password":<password>,  
    }

Username and password must be stored in /data/db.js

It returns the token that must be used on the headers of all calls:
headers:

    {
        "x-access-token": <token retrieved from the login>
        "username": <username used in login>
    }  

### /searchPosts
Retrieves posts by text present either on the title or content.
It only retrieves public posts or private posts for the authenticated user as well as its draft posts.
Usage:
post body:

    {
        "searchText": "aea adad everyone"
    }
headers:

    {
        "x-access-token": <token retrieved from the login>
	"username": <username used in login>
    }    

### /posts
Used for handling posts. It requires token and username sent on the header.

#### Method: get
Retrieves all public posts or private posts for the authenticated  user. It does not include draft posts which can be retrieved by id.

#### Method get /post/:id
Retrieves the post for the given id even though it is draft. It retrieves only posts for the authenticated user or publics posts.

#### Method post
Add new post for the  authenticated user. Title and content are required.
post body:

    {
         "title": <free text>,
	 "content": <free text>,
	 "private": boolean,
	 "draft": boolean,
    }

TODO: Add more validation on the input fields such as this package does https://github.com/express-validator/express-validator

#### Method Delete
Delete the post by id. It validates if user is the author.
/posts/:id

Method Put
Update the post based on the id. It validates if the user is the owner.
/posts/:id

post body:

    {
        "title": <free text>,
	"content": <free text>,
	"private": boolean,
	"draft": boolean,
    }

## Unit Test
It is a simple project usiung mocha and chai. It mocks the request object and stubs the database.
#### TODO: Increase unit test coverage.

## Integration tests
It start the app and call it on the API. It test the en-to-end flow.
#### TODO: Increase API testing coverage.
