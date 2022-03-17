var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://172.18.0.2:27017/";    for specific docker container
var url = "mongodb://localhost:27017/"



/* show all the calls in the data base */
exports.showData = function (callback) {

  
  let error = null
  
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("phoneCalls");
        dbo.collection("calls").find({}, { projection: { _id: 0 }}).toArray(function(err, result) {
            if (err) throw err;
            console.log("\nPhone Calls:");
            console.log(result);
            
            callback(error, result)
            
            db.close();
        });
    });
    
};

/* remove call from the data base by query */
exports.deleteData = function (query) {
    
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("phoneCalls");
          var myquery = query;
          dbo.collection("calls").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("\nRemove Call:");      
              
              db.close();
          });
      });
      
  };


/* insert new call document in to the data base */
exports.insertNewCall = function (time_, city_, gender_, age_, prev_, product_, topic_) {
  
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("phoneCalls");
        var obj = { StartTime: time_, City: city_, Gender: gender_, Age: age_, PrevCalls: prev_,
                    Product: product_, Topic: topic_ };
        dbo.collection("calls").insertOne(obj, function(err, res) {
          if (err) throw err;

          console.log("1 document inserted");
          db.close();
        });
    });
    
};

    