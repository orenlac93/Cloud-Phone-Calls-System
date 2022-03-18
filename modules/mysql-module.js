var mysql = require('mysql2');



exports.insertNewCall = function (/*time_, city_, gender_, age_, prev_, product_, topic_*/Call) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0000", //insert your password here
        database: new Date().toLocaleDateString().replace('/', 'x').replace('/', 'x')
    });


    var createDB = "CREATE DATABASE IF NOT EXISTS ".concat(new Date().toLocaleDateString().replace('/', 'x').replace('/','x'));
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(createDB, function (err, result) {
            if (err) throw err;
            console.log("Database created and named :".concat(new Date().toLocaleDateString()));
        });
        var createTable = "CREATE TABLE IF NOT EXISTS customers ";
        //time, city, gender, age, prev, product, topic
        createTable = createTable.concat("(time VARCHAR(255), ");
        createTable = createTable.concat("city VARCHAR(255), ");
        createTable = createTable.concat("gender VARCHAR(255), ");
        createTable = createTable.concat("age VARCHAR(255), ");
        createTable = createTable.concat("prev VARCHAR(255), ");
        createTable = createTable.concat("product VARCHAR(255), ");
        createTable = createTable.concat("topic VARCHAR(255)) ");
        con.query(createTable, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        var insertQuery = "INSERT INTO customers "
        insertQuery = insertQuery.concat('(time,city,gender,age,prev,product,topic)')
        insertQuery = insertQuery.concat(' VALUES ')
        insertQuery = insertQuery.concat('(\'')
        insertQuery = insertQuery.concat(Call[0].toString().concat('\',\'')/*time*/);
        insertQuery = insertQuery.concat(Call[1].toString().concat('\',\'')/*city*/);
        insertQuery = insertQuery.concat(Call[2].toString().concat('\',\'')/*gender*/);
        insertQuery = insertQuery.concat(Call[3].toString().concat('\',\'')/*age*/);
        insertQuery = insertQuery.concat(Call[4].toString().concat('\',\'')/*prev*/);
        insertQuery = insertQuery.concat(Call[5].toString().concat('\',\'')/*product*/);
        insertQuery = insertQuery.concat(Call[6].toString()/*topic*/);
        insertQuery = insertQuery.concat('\')')
        con.query(insertQuery, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        
    });
    //die hard
    //con.on('error', function () { });
    //con.end();
};

exports.printDB = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0000", //insert your password here
        database: new Date().toLocaleDateString().replace('/', 'x').replace('/', 'x')
    });

    var printDBq = "SELECT * FROM customers"
    con.query(printDBq, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    //Disconnect hardly
    con.on('error', function () { });
    con.end();
};

exports.deleteTable = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0000",
        database: new Date().toLocaleDateString().replace('/', 'x').replace('/', 'x')
    });

    con.connect(function (err) {
        if (err) throw err;
        var sql = "DROP TABLE customers";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });

    con.end()
};


