const express = require('express'); 
const app = express(); 

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var sleep = require('system-sleep');
var redisModule = require('./modules/redis-module.js');








app.set("view engine", "ejs"); 

app.use(express.static("public")); 



number1 = Math.floor(Math.random() * 100) + 1;
number2 = Math.floor(Math.random() * 100) + 1;
number3 = Math.floor(Math.random() * 100) + 1;
number4 = Math.floor(Math.random() * 100) + 1;
number5 = Math.floor(Math.random() * 100) + 1;

var values = [number1, number2, number3, number4, number5];





  

app.get("/", function(req, res) { 

    res.render("dashboard.ejs");
}); 



  
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', values);
    });
});



server.listen(5000, () => {
    console.log('listening on *:5000');
    
    while(true){
        sleep(1000);

        number1 = Math.floor(Math.random() * 100) + 1;
        number2 = Math.floor(Math.random() * 100) + 1;
        number3 = Math.floor(Math.random() * 100) + 1;
        number4 = Math.floor(Math.random() * 100) + 1;
        number5 = Math.floor(Math.random() * 100) + 1;

        values = [number1, number2, number3, number4, number5];
    }    
});
 

