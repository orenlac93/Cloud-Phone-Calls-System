var mongoModule = require('./modules/mongo-module.js');

const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');
const date = require('date-and-time');


var bigml = require('bigml');
//const { time } = require('console');


const port = 4000



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

var topicPrediction;


app.get("/", function(req, res) {

    mongoModule.writeToCSV(); 
    
    res.render("prediction.html");
});


/* write the current data from mongoDB to csv file */
app.get('/write', (req, res) => {

    //mongoModule.writeToCSV();    

    //res.send('writing the data to csv file')
});


/* train new model based on the mongoDB current data */
app.get('/trainModel', (req, res) => {

    

    // username and the API KEY 
    var connection = new bigml.BigML('ORENLAC93','3c4666183ab561cc6378906c7a3d4b2e2edc82e2')

    var source = new bigml.Source(connection);
    source.create('./data/callsData.csv', function(error, sourceInfo) {
    if (!error && sourceInfo) {
        var dataset = new bigml.Dataset(connection);
        dataset.create(sourceInfo, function(error, datasetInfo) {
        if (!error && datasetInfo) {
            var model = new bigml.Model(connection);
            model.create(datasetInfo, function (error, modelInfo) {
            if (!error && modelInfo) {
                var prediction = new bigml.Prediction(connection);
                prediction.create(modelInfo, {'City': 'Tel Aviv', 'Gender': 'female', 'Age': 40, 'Product': 'internet'},function(error, prediction) { 
                    //console.log(JSON.stringify(prediction));
                    topicPrediction = prediction.object.output;
                    console.log(topicPrediction)
                });
                    
            }
            });
        }
        });
    }
    }); 
    
    

    //res.send('train model...')
    res.render("trainModel.html");
});


/* get prediction from existing model */
app.get('/prediction', (req, res) => {

    

    // username and the API KEY 
    var connection = new bigml.BigML('ORENLAC93','3c4666183ab561cc6378906c7a3d4b2e2edc82e2')

    var prediction = new bigml.Prediction(connection);

    
    
    var now = new Date(); 
    time = date.format(now, 'DD.MM.YYYY HH:mm:ss'); 
    

    /*
    var city_list = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Beersheba'];
    var city = city_list[Math.floor(Math.random() * city_list.length)];

    var gender_list = ['male', 'female'];
    var gender = gender_list[Math.floor(Math.random() * gender_list.length)];

    age = Math.floor(Math.random() * 80) + 18;
    

    prev = Math.floor(Math.random() * 20);

    
    var product_list = ['internet', 'cables', 'cellular', 'all'];
    var product = product_list[Math.floor(Math.random() * product_list.length)];

    */


    const city = req.query.city;
    const gender = req.query.gender;
    const age = req.query.age;
    const prev = req.query.prevCall;
    const product = req.query.product;

    
    prediction.create('model/62646342049fde7e750007eb', {'StartTime': time, 'City': city, 'Gender': gender, 'Age': age, 'PrevCalls': prev, 'Product': product},function(error, prediction) { 
        //console.log(JSON.stringify(prediction));
        topicPrediction = prediction.object.output;
        console.log(topicPrediction)
    });
    //res.send(`prediction: ${topicPrediction}`)
    res.render("showPrediction.html", {topicPrediction_: topicPrediction});

    
    
});


server.listen(port, () => console.log(`listening at http://localhost:${port}`));
