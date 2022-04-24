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


            time1 = 0;
            time2 = 0;
            time3 = 0;
            time4 = 0;
            time5 = 0;
            time6 = 0;
            time7 = 0;
            time8 = 0;
            time9 = 0;
            time10 = 0;
            time11 = 0;
            time12 = 0;
            time13 = 0;



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


                if(element.time.substring(11, 13).toString() == "08"){
                    time1++;
                }
                else if(element.time.substring(11, 13).toString() == "09"){
                    time2++;
                }
                else if(element.time.substring(11, 13).toString() == "10"){
                    time3++;
                }
                else if(element.time.substring(11, 13).toString() == "11"){
                    time4++;
                }
                else if(element.time.substring(11, 13).toString() == "12"){
                    time5++;
                }
                else if(element.time.substring(11, 13).toString() == "13"){
                    time6++;
                }
                else if(element.time.substring(11, 13).toString() == "14"){
                    time7++;
                }
                else if(element.time.substring(11, 13).toString() == "15"){
                    time8++;
                }
                else if(element.time.substring(11, 13).toString() == "16"){
                    time9++;
                }
                else if(element.time.substring(11, 13).toString() == "17"){
                    time10++;
                }
                else if(element.time.substring(11, 13).toString() == "18"){
                    time11++;
                }
                else if(element.time.substring(11, 13).toString() == "19"){
                    time12++;
                }
                else if(element.time.substring(11, 13).toString() == "20"){
                    time13++;
                }
            
            });
                
            
            
            number1 = joining;
            number2 = cutoff;
            number3 = complaint;
            number4 = service;
            number5 = overall;

            values = [number1, number2, number3, number4, number5,
                time1, time2, time3, time4, time5, time6, time7,
                time8, time9, time10, time11, time12, time13];

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
            io.emit('chat message', values);

        });
    }    
});
 

