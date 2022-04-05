
const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');

//var mongoModule = require('./modules/mongo-module.js')
var mysqlModule = require('./modules/mysql-module.js');

const kafka = require('./modules/kafka-module');



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

    res.send('message was sent to kafka')
});


server.listen(port, () => console.log(`Kafka Producer listening at http://localhost:${port}`));
