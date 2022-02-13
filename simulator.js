const date = require('date-and-time');
var sleep = require('system-sleep');
var mongoModule = require('./mongo-module.js')

function createPhoneCall() {
        

    const now = new Date();
        
    time = date.format(now, 'DD.MM.YYYY HH:mm:ss'); 
    console.log(time);


    var city_list = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Beersheba'];
    var city = city_list[Math.floor(Math.random() * city_list.length)];
    console.log(city);


    var gender_list = ['male', 'female'];
    var gender = gender_list[Math.floor(Math.random() * gender_list.length)];
    console.log(gender);

    age = Math.floor(Math.random() * 80) + 18;
    console.log(age);

    prev = Math.floor(Math.random() * 20);
    console.log(prev);

    var product_list = ['internet', 'cables', 'cellular', 'all'];
    var product = product_list[Math.floor(Math.random() * product_list.length)];
    console.log(product);

    var topic_list = ['joining', 'cutoff', 'complaint', 'service'];
    var topic = topic_list[Math.floor(Math.random() * topic_list.length)];
    console.log(topic);

    mongoModule.insertNewCall(time, city, gender, age, prev, product, topic)

}

var numOfIterations = 10

var num_of_seconds = Math.floor(Math.random() * 30) + 1;
var timeToWait = num_of_seconds*1000

for (let i = 0; i < numOfIterations; i++){
    sleep(timeToWait);
    createPhoneCall();
    console.log('\n');
    num_of_seconds = Math.floor(Math.random() * 10) + 1;
    timeToWait = num_of_seconds*1000
}

