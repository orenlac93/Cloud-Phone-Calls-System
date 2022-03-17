
const express = require('express');
const app = express();
var server = require('http').createServer(app);

var mongoModule = require('./modules/mongo-module.js')

const port = 3000

const kafka = require('./modules/kafka-module');


var call   // store the current phone call


/* get the first call from the database */
mongoModule.showData((err, result) => {
  if(err) { 
    console.log(err)
  } 
  else { 
    call = result[0]
  }
})  




app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));
app.get('/send', (req, res) => {


    /* update the current call from the database */  
    mongoModule.showData((err, result) => {
      if(err) { 
        console.log(err)
      } 
      else { 
        call = result[0]
      
      }
    })  

    kafka.publish(call);   // send the current call to kafka
    mongoModule.deleteData({ StartTime: call.StartTime }); 
    res.send('message was sent to kafka')
});


server.listen(port, () => console.log(`Kafka Producer listening at http://localhost:${port}`));
