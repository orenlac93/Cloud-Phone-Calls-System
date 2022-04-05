const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
var sleep = require('system-sleep');


const port = 8080

var mysqlModule = require('./modules/mysql-module.js');



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))


mysqlModule.getData(function(result){

  calls = result;  // store the phone calls collection
  console.log(calls);



  app.get('/', function (req, res) {


      res.render('index.ejs', {calls_: calls});
      
      //res.sendFile(path.join(__dirname, 'views/index.html'));
  
  })

});



app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`)

  while(true){
    sleep(1000);
            
    mysqlModule.getData(function(result){

      calls = result;  // store the phone calls collection
    });  
  } 


})

