var mongoModule = require('./modules/mongo-module.js');

const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');

const port = 3000

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))



app.get("/", function(req, res) { 
    res.render("prediction.html");
});

app.get('/write', (req, res) => {

    mongoModule.writeToCSV();    

    res.send('writing the data to csv file')
});


server.listen(port, () => console.log(`listening at http://localhost:${port}`));