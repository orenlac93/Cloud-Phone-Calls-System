const express = require('express'); 
const app = express(); 

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var sleep = require('system-sleep');
var redisModule = require('./modules/redis-module.js');
var mysqlModule = require('./modules/mysql-module.js');








app.set("view engine", "ejs"); 

app.use(express.static("public")); 



mysqlModule.getData(function(result){
    data = result;
    
    overall = data.length;
    joining = 0;
    cutoff = 0;
    complaint = 0;
    service = 0;

    data.forEach(element => {
        if(element.topic == 'joining'){
            joining++;
        }
        else if(element.topic == 'cutoff'){
            cutoff++;
        }
        else if(element.topic == 'complaint'){
            complaint++;
        }
        else if(element.topic == 'service'){
            service++;
        }

    });
    


    number1 = joining;
    number2 = cutoff;
    number3 = complaint;
    number4 = service;
    number5 = overall;

    var values = [number1, number2, number3, number4, number5];





    

    app.get("/", function(req, res) { 

        res.render("dashboard.ejs", values);
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

});



server.listen(5000, () => {

    console.log('listening on *:5000');

        
    while(true){
        sleep(1000);

        mysqlModule.getData(function(result){

            data = result;
        
            overall = data.length;
            joining = 0;
            cutoff = 0;
            complaint = 0;
            service = 0;

            data.forEach(element => {
                if(element.topic == 'joining'){
                    joining++;
                }
                else if(element.topic == 'cutoff'){
                    cutoff++;
                }
                else if(element.topic == 'complaint'){
                    complaint++;
                }
                else if(element.topic == 'service'){
                    service++;
                }
            
            });
                
            
            
            number1 = joining;
            number2 = cutoff;
            number3 = complaint;
            number4 = service;
            number5 = overall;

            values = [number1, number2, number3, number4, number5];

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

        });
    }    
});
 

