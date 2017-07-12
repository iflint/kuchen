var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient

// location of public assets
app.use(express.static('public'))
app.set('view engine', 'pug')
app.set("views", __dirname + "/views")

// Initialize database connection
// start the app after connection is made
MongoClient.connect('mongodb://localhost:27017/pete', function(err, database) {
	if(err) throw err
	db = database
	server.listen(8081)
})

app.get('/', function(req, res) {
	//res.sendFile(__dirname + '/index.html')
	db.collection('test').count().then(function (data) {
		console.log(data)
		callback(data)
		
	})
	res.render('index', {to: 'yo'})
})
