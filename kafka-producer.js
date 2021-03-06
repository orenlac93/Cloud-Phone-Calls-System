
const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');

//var mongoModule = require('./modules/mongo-module.js')
var mysqlModule = require('./modules/mysql-module.js');

const kafka = require('./modules/kafka-module');

var sleep = require('system-sleep');

const port = 3000

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))




/* get the first call from the database */

mysqlModule.getData(function(result){
  call = result[0];

  app.get("/", function(req, res) { 
      res.render("kafka.html", {call_: call});
  });
}); 

app.get('/send', (req, res) => {


    kafka.publish(call);   // send the current call to kafka
    
    mysqlModule.deleteCall()   // current call from the database (mySql) 

    //res.send('message was sent to kafka')
    res.render("kafkaSend.html");
});


server.listen(port, () => {
  console.log(`Kafka Producer listening at http://localhost:${port}`);

  while(true){
    sleep(1000);
    mysqlModule.getData(function(result){
      call = result[0];
    
    }); 
  }  
});
