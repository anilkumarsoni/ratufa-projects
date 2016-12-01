var http = require('http');
var options = {
	'host':'localhost',
	'port':'8085',
	'path':'/index.html'
}

var callback = function(responce){
	var body = "";
	responce.on('data',function(data){
			body += data;
	});
	responce.on('end',function(){
		console.log(body);
	})
}

//make a request to the server
var req = http.request(options,callback);
req.end();