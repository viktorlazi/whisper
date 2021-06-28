# Whisper
Whisper is a security and privacy oriented messaging service.

## How secure and private is it?
* Messages are encrypted client side using custom E2EE.
* The encryption method in this project is just a proof of concept and should not be used for security reasons. (I am not a cryptographer! This method is vulnerable to attacks)
* There is no need for a phone number, only username and password
* Passwords are hashed in database

## How's it made?
* Built in React to run in browsers
* Node.js and express is used server side
* MongoDB as a database storing usernames and passwords

## Setup
To run it locally:
* npm start in client directory
* node server.js in server directory
* connect to mongodb of choice

## Prime number used

   111F728933532D

   The generator is: 2.
