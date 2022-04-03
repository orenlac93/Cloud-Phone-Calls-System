
const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');

var mongoModule = require('./modules/mongo-module.js')

const kafka = require('./modules/kafka-module');



const port = 3000

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))



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




//app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));

app.get("/", function(req, res) { 
    res.render("kafka.html", {call_: call});
}); 

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
