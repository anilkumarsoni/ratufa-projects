var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request,responce){
	var pathname = url.parse(request.url).pathname;
	console.log("request recieved for "+pathname);
	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			responce.writeHead(404,{'Content-Type':'text/html'});
		}else{
			responce.writeHead(200,{'Content-Type':'text/html'});
			responce.write(data.toString());
		}

		responce.end();
	});
}).listen(8085);

console.log("server running on http://localhost:8085");