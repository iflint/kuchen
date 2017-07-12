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

	// aggregate totals from the database
	var foodLog = [{
		name: 'burger',
		quantity: 150,
		calories: 400,
		protein: 25,
		carb: 35,
		sugar: 20,
		unsatfat: 10,
		satfat: 10
	}, {
		name: 'cake',
		quantity: 150,
		calories: 500,
		protein: 25,
		carb: 70,
		sugar: 20,
		unsatfat: 10,
		satfat: 10
	}, {
		name: 'banana',
		quantity: 150,
		calories: 200,
		protein: 25,
		carb: 35,
		sugar: 20,
		unsatfat: 10,
		satfat: 10
	}]
	var actualTotal = {
		calories: 700,
		protein: 25,
		carb: 35,
		sugar: 20,
		unsatfat: 10,
		satfat: 10
	}
	var remainderTotal = {
		calories: 100,
		protein: 25,
		carb: 70,
		sugar: 20,
		unsatfat: 10,
		satfat: 10
	}


	res.render('index', {
		actualTotal: actualTotal,
		remainderTotal: remainderTotal,
		foodLog: foodLog
	})
})
