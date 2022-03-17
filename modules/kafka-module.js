const Kafka = require("node-rdkafka");
const uuid = require("uuid");


const kafkaConf = {
  "group.id": "oren",
  "metadata.broker.list": "tricycle-01.srvs.cloudkafka.com:9094,tricycle-02.srvs.cloudkafka.com:9094,tricycle-03.srvs.cloudkafka.com:9094",
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "2b2rxa4e",
  "sasl.password": "j9-Vgl3xw9irInEnT-lb3U1P9SJnwYKw"
};

const prefix = "2b2rxa4e-";
const topic = `${prefix}cloud-app`;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);


producer.on("ready", function(arg) {
  console.log(`producer ${arg.name} ready.`); 
});


producer.connect();

module.exports.publish= function(msg)
{
  
  
  m=JSON.stringify(msg);
  producer.produce(topic, -1, genMessage(m), uuid.v4());     

  
}

