const redis = require('redis')
var app = require('express')();
var server = require('http').Server(app);


class redisInstance  {
	
	constructor() {
		const Rclient = redis.createClient(6379, '127.0.0.1');
		this.client = Rclient;
		this.createConnection();
		this.state = "Connected";
		this.client.set("Calls on hold", 0);
		this.client.set("Avarage time a call is on hold", 0);
		this.client.set("joins", 0);
		this.client.set("complains", 0);
		this.client.set("cutoffs", 0);
		/*Delete DB every 24 hrs*/
		this.intervalId = setInterval(function () {
			deleteAll();
		}, 60000*60*24);
	}
	createConnection() {
		this.client.connect();
	}
	incCallOnHold = function () {
		this.client.incr("Calls on hold")
	}
	incJoin = function () {
		this.client.incr("joins")
	}
	incComps = function () {
		this.client.incr("complains")
	}
	incCutoffs = function () {
		this.client.incr("cutoffs")
	}
	getData = function () {
		allDataToDisplay = []
		allDataToDisplay.push(this.client.get("joins"))
		allDataToDisplay.push(this.client.get("complains"))
		allDataToDisplay.push(this.client.get("cutoffs"))
		allDataToDisplay.push(this.client.get("Avarage time a call is on hold"))
		allDataToDisplay.push(this.client.get("Calls on hold"))
		return allDataToDisplay;
	}
	deleteAll = function () {
		this.client.flushAll();
	}
	delete = function (toDelete) {
		this.client.del(toDelete);
	}
	/*may be redundent*/
	insertNewCall = function (time_, city_, gender_, age_, prev_, product_, topic_) {
		this.client.lPush(time_, city_, gender_, age_, prev_, product_, topic_);
	}
	test = function () {
		this.client.set("ok", "yes");
	}
	disconnect = function () {
		this.client.quit();
		this.state = "Disconnected";
		clearInterval(this.intervalId)
	}

};

inst = new redisInstance();
inst.test();
inst.incCutoffs();
inst.incCutoffs();
inst.incCutoffs();
inst.incCutoffs();