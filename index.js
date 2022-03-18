const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
var sleep = require('system-sleep');


const port = 8080


var mongoModule = require('./modules/mongo-module.js');
var mysqlModule = require('./modules/mysql-module.js');
var simulator = require('./simulator.js');


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


var calls   // store the phone calls collection
var phoneCall = simulator.simulatePhoneCalls(1);

/* insert call to mySQL local database */

mysqlModule.insertNewCall(phoneCall);
mysqlModule.printDB();
mysqlModule.deleteTable();

/* show all the users in mongodb */

mongoModule.showData((err, result) => {
  if(err) { 
    console.log(err)
  } 
  else { 
    calls = result
   
  }
})  



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', function (req, res) {


    res.render('index.ejs', {calls_: calls});
    
    //res.sendFile(path.join(__dirname, 'views/index.html'));
 
})





app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`)

  while(true){
    sleep(1000);
    mongoModule.showData((err, result) => {
      if(err) { 
        console.log(err)
      } 
      else { 
        calls = result
      }
    })
  } 


})

