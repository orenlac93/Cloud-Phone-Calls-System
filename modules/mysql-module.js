let mysql = require('mysql');




exports.insertCall = function (call) {

    let connection = mysql.createConnection({
        multipleStatements: true,
        host: 'localhost',
        user: 'root',
        password: '0000', 
        database: 'phoneCalls' 
    });


    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server');

        let query = `
            CREATE DATABASE IF NOT EXISTS phoneCalls;
        `;



        connection.query(query, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
            console.log("Database created");     
        });

        let query2 = `
            CREATE TABLE IF NOT EXISTS customers 
            (time VARCHAR(255), 
            city VARCHAR(255), 
            gender VARCHAR(255), 
            age VARCHAR(255), 
            prev VARCHAR(255), 
            product VARCHAR(255), 
            topic VARCHAR(255));
        `;

        connection.query(query2, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
            console.log('Table created');
        });
        
        
        // insert statement
        let sql = `
            INSERT INTO customers 
            (time, city, gender, age, prev, product, topic) 
            VALUES ?
        `;

        //values = [['17.03.2022 22:57:39', 'Beersheba', 'female', '73', '9', 'all', 'joining']] 
        values = [call]

        // execute the insert statement
        connection.query(sql, [values], function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
            console.log('New Value Inserted');
        });

    
        
        connection.end(function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log('Connection to the MySQL server is closed');
        });  
          
    });
      
      
      

};





exports.getData = function (callback) {

  let connection = mysql.createConnection({
      multipleStatements: true,
      host: 'localhost',
      user: 'root',
      password: '0000', 
      database: 'phoneCalls' 
  });



  connection.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
      console.log('Connected to the MySQL server');

      let query = `
          CREATE DATABASE IF NOT EXISTS phoneCalls;
      `;



      connection.query(query, function(err, results, fields) {
          if (err) {
            console.log(err.message);
          }
          console.log("Database created");     
      });

      let query2 = `
          CREATE TABLE IF NOT EXISTS customers 
          (time VARCHAR(255), 
          city VARCHAR(255), 
          gender VARCHAR(255), 
          age VARCHAR(255), 
          prev VARCHAR(255), 
          product VARCHAR(255), 
          topic VARCHAR(255));
      `;

      connection.query(query2, function(err, results, fields) {
          if (err) {
            console.log(err.message);
          }
          console.log('Table created');
      });
      
      
      // select statement
      let sql = `SELECT * FROM customers`;

      
      
      connection.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        
        //console.log(results);
        return callback(results)
      });

      

      connection.end(function(err) {
          if (err) {
            return console.log(err.message);
          }
          console.log('Connection to the MySQL server is closed');
          
      });  
        
  });
      
    

};  



