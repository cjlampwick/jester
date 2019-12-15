Install:

    > node server/server.js

Run MongooDB:

    > .\mongod.exe

Create Users:

    Create basic user:

        Post to:
            localhost:3000/signup

        Body: (x-www-form-urlencoded)
            email: john@gmail.com
            password: john
            role: customer

    Create an admin:

        Post to:
            localhost:3000/signup

        Body: (x-www-form-urlencoded)
            email: admin@example.com
            password: administrator
            role: admin

List users:

    Get on Postman:
        
        Headers: x-access-token = {token received in sign up response}