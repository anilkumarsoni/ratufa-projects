var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contacts',['contacts']); ///'contacts'==> databse , ['contacts']==> collection name

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public"));


app.get('/contactlist',function(req,res){
	db.contacts.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});
app.post('/contactlist',function(req,res){
	
	db.contacts.insert(req.body,function(err,docs){
		res.json(docs);
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contacts.remove({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contacts.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.put('/contactlist',function(req,res){
	var id = req.body._id;
	db.contacts.findAndModify({query:{_id:mongojs.ObjectId(id)},update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},new:true},function(err,docs){
		res.json(docs);
	})
});

app.listen(3000);
console.log("server running on 3000");