var events = require('events');

//creating a new events emiter
var eventsEmitter = new events.EventEmitter();

//creating an event handler cor connection event
var connectHandler = function connected(){
	console.log("connection successfull.");

	//fire the data receved event
	eventsEmitter.emit('data_received');
}

//bind the connection event with handler
eventsEmitter.on('connection',connectHandler);

// bind the data_received event with handler
eventsEmitter.on('data_received',function(){
	console.log("data receved successfully");
});

//fire the connection event
eventsEmitter.emit('connection');

console.log(listnerCount(eventsEmitter,'connection'));