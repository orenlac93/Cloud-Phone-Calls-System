var mysql = require('mysql2');

exports.insertNewCall = function (time_, city_, gender_, age_, prev_, product_, topic_) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0000" //insert your password here
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });





};

