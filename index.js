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
		protein: 100,
		carb: 200,
		sugar: 80,
		unsatfat: 60,
		satfat: 60
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

	var actual = {
		calories: 0,
		protein: 0,
		carb: 0,
		sugar: 0,
		unsatfat: 0,
		satfat: 0
	}
	for (i in foodLog) {
		actual.calories = actual.calories + foodLog[i].calories
		actual.protein = actual.protein + foodLog[i].protein
		actual.carb = actual.carb + foodLog[i].carb
		actual.sugar = actual.sugar + foodLog[i].sugar
		actual.unsatfat = actual.unsatfat + foodLog[i].unsatfat
		actual.satfat = actual.satfat + foodLog[i].satfat
	}
	console.log(actual)
	var target = {
		calories: 3500,
		protein: 750,
		carb: 1500,
		sugar: 250,
		unsatfat: 750,
		satfat: 250
	}
	// var actualTotal = {
	// 	calories: 1100,
	// 	protein: 25,
	// 	carb: 35,
	// 	sugar: 20,
	// 	unsatfat: 10,
	// 	satfat: 10
	// }


	res.render('index', {
		target: target,
		actual: actual,
		foodLog: foodLog,
		chartScale: 500
	})
})
