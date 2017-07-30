var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient

// location of public assets
app.use(express.static('public'))
// formats data in form post request
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set("views", __dirname + "/views")

// Initialize database connection
// start the app after connection is made
MongoClient.connect('mongodb://localhost:27017/kuchen', function(err, database) {
	if(err) throw err
	db = database
	server.listen(8081)
})
app.post('/newItem', function(req, res) {
	res.redirect('/')
	var item = {
		name: req.body.name,
		type: 'item',
		createdUser: 'Anon',
		createdDate: new Date(),
		servingSize: req.body.serving,
		perUnit: {
			// measured in calories/gram
			cal: req.body.cal/req.body.serving,
			pro: req.body.pro*4/req.body.serving,
			car: req.body.car*4/req.body.serving,
			fat: req.body.fat*9/req.body.serving,
			sat: req.body.sat*9/req.body.serving,
			uns: (req.body.fat-req.body.sat)*9/req.body.serving,
			sug: req.body.sug*4/req.body.serving,
			nsc: (req.body.car-req.body.sug)*4/req.body.serving,
			// not counted in calories, just per gram
			fib: req.body.fib/req.body.serving,
			cho: req.body.cho/req.body.serving,
			sod: req.body.sod/req.body.serving,
		}
	}
	console.log(item);
	db.collection('test').insert(item);
})
app.get('/addItem', function(req, res) {
	db.collection('test').find().toArray(function (err, data) {
		res.render('addItem', {
			foodLog: data
		})
	})
	
})
app.get('/', function(req, res) {
	//res.sendFile(__dirname + '/index.html')
	db.collection('test').count().then(function (data) {
		console.log(data)
		var foodLog = [{
			name: 'Nothing Burger',
			quantity: 150,
			calories: 400,
			protein: 100,
			carb: 200,
			sugar: 80,
			unsatfat: 60,
			satfat: 60
		}, {
			name: 'Cake',
			quantity: 150,
			calories: 500,
			protein: 25,
			carb: 70,
			sugar: 20,
			unsatfat: 10,
			satfat: 10
		}, {
			name: 'Flour',
			quantity: 150,
			calories: 200,
			protein: 25,
			carb: 35,
			sugar: 20,
			unsatfat: 10,
			satfat: 10
		}, {
			name: 'Banana',
			quantity: 150,
			calories: 80,
			protein: 25,
			carb: 35,
			sugar: 20,
			unsatfat: 10,
			satfat: 10
		}, {
			name: 'Flour',
			quantity: 150,
			calories: 200,
			protein: 25,
			carb: 35,
			sugar: 20,
			unsatfat: 10,
			satfat: 10
		}, {
			name: 'Banana',
			quantity: 150,
			calories: 80,
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
		var target = {
			calories: 1800,
			protein: 750,
			carb: 1500,
			sugar: 250,
			unsatfat: 750,
			satfat: 250
		}

		var remaining = {
			calories: target.calories-actual.calories,
			protein: target.protein-actual.protein,
			carb: target.carb-actual.carb,
			sugar: target.sugar-actual.sugar,
			unsatfat: target.unsatfat-actual.unsatfat,
			satfat: target.satfat-actual.satfat
		}
		console.log(actual, remaining)
		res.render('index', {
			target: target,
			actual: actual,
			remaining: remaining,
			foodLog: foodLog,
			chartScale: 200
		})
		callback(data)
	})
})
