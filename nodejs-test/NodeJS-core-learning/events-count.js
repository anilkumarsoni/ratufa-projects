var events = require('events');
var eventEmitter = new events.EventEmitter();

var evtHandlr_one = function HandelarOne() {
	console.log("first event handelat has been occoured");
}
var evtHandlr_two = function HandelarTwo() {
	console.log("Second event handelat has been occoured");
}

eventEmitter.on('event1',evtHandlr_one);
eventEmitter.on('event1',evtHandlr_two);

eventEmitter.emit('event1');

total_listners = require('events').EventEmitter.listenerCount(eventEmitter,'event1');
console.log(total_listners + " Listner(s) listening to event1 event");

eventEmitter.removeListener('event1',evtHandlr_one);

total_listners = require('events').EventEmitter.listenerCount(eventEmitter,'event1');
console.log(total_listners + " Listner(s) listening to event1 event");