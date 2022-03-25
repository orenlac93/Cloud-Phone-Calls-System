
const redis = require('redis')




exports.showRedisData = function (callback) {

  
	(async () => {

	  	
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();


	
	  const joining = await client.get('joining');
	  const cutoffs = await client.get('cutoffs');
	  const complaint = await client.get('complaint');
	  const service = await client.get('service');
	  const on_hold = await client.get('on hold');


	  console.log('\njoining:')
	  console.log(joining)
	  console.log('\ncutoffs:')
	  console.log(cutoffs)
	  console.log('\ncomplaint:')
	  console.log(complaint)
	  console.log('\nservice:')
	  console.log(service)
	  console.log('\non hold:')
	  console.log(on_hold)

  
	  await client.quit();
	  
	  
	})();
	
};
  
  exports.initRedis = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  await client.set('joining', 0);  
	  await client.set('cutoffs', 0); 
	  await client.set('complaint', 0);
	  await client.set('service', 0);
	  await client.set('on hold', 0);     
	  
	  await client.quit();
	  
	  
	})();
	
};


exports.incJoining = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  
	  await client.incr('joining');    
	  
	  await client.quit();
	  
	  
	})();
	
};

exports.incCutoffs = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  
	  await client.incr('cutoffs');    
	  
	  await client.quit();
	  
	  
	})();
	
};

exports.incComplaint = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  
	  await client.incr('complaint');    
	  
	  await client.quit();
	  
	  
	})();
	
};

exports.incService = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  
	  await client.incr('service');    
	  
	  await client.quit();
	  
	  
	})();
	
};

exports.incOnHold = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  
	  await client.incr('on hold');    
	  
	  await client.quit();
	  
	  
	})();
	
};


exports.deleteAll = function (option) {
	
	(async () => {
  
	  const client = redis.createClient();
  
	  client.on('error', (err) => console.log('Redis Client Error', err));
  
	  await client.connect();
  
	  
	  await client.flushAll();    
	  
	  await client.quit();
	  
	  
	})();
	
};








