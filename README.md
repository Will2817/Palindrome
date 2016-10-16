# Palindrome
Web server to store messages and test for palindromes.
## Demo
Demo application can be found at [Demo](http://54.187.128.67/).
![alt tag](/.images/demo.png?raw=true)
## Get source from
```
https://github.com/Will2817/Palindrome.git
```
## How to Install and Run
###1\. Install dependancies 
```
npm install
```
###2\. Set environment varibales
Examples
```
MONGO_URL = "mongodb://localhost:27017" 
APP_PORT  = 3000
```
###3\. Start application
```
node server.js
```
## How to Install and Run with Docker
```
docker build -t palindrome-app .
docker run -d --name palindrome_app -p 3000:3000 -e "MONGO_URL=mongodb://localhost:27017" -e "APP_PORT=3000" -it palindrome-app
```
## How to Install with DockerCompose
```
docker-compose up --build -d
```
## API docs
The API docs can be found [Here](http://54.187.128.67/apidoc) or if running locally at ```localhost:3000/apidoc```
## Sequence Diagrams
###GET Messages - Request all Messages
![alt tag](/.images/get_messages.png?raw=true)
###GET Message - Request a Message
![alt tag](/.images/get_message.png?raw=true)
###POST Message - Insert a Message
![alt tag](/.images/post_message_create.png?raw=true)
###POST Message - Update a Message
![alt tag](/.images/post_message_update.png?raw=true)
###DELETE Message - Delete a Message
![alt tag](/.images/delete_message.png?raw=true)
