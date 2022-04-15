var mongoModule = require('./modules/mongo-module.js');

const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require('body-parser');

var bigml = require('bigml');


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

    mongoModule.writeToCSV();    

    res.send('writing the data to csv file')
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
    
    

    res.send('train model...')
});


/* get prediction from existing model */
app.get('/prediction', (req, res) => {
    // username and the API KEY 
    var connection = new bigml.BigML('ORENLAC93','3c4666183ab561cc6378906c7a3d4b2e2edc82e2')

    var prediction = new bigml.Prediction(connection);

    
    prediction.create('model/62593e0d5198db5eed000299', {'City': 'Tel Aviv', 'Gender': 'female', 'Age': 40, 'Product': 'internet'},function(error, prediction) { 
        //console.log(JSON.stringify(prediction));
        topicPrediction = prediction.object.output;
        console.log(topicPrediction)
    });
    //res.send(`prediction: ${topicPrediction}`)
    res.render("showPrediction.html", {topicPrediction_: topicPrediction});
});


server.listen(port, () => console.log(`listening at http://localhost:${port}`));