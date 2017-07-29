var item = {
	id: 'name',
	type: 'item',
	description: 'lskdf s dk skd flsd',
	createdUser: 'user id',
	createdTime: 'date object', 
	servingSize: 300,
	perUnit: {
		cal: 10, // calories
		pro: 10, // protein
		car: 10, // carbohydrates
		fat: 10, // total fat
		sat: 10, // saturated fat
		uns: 10, // unsaturated fat
		sug: 10, // sugar
		nsc: 10, // non-sugar carb
		fib: 10, // fiber
		cho: 10, // cholesterol
		sod: 10, // sodium
	}
}

var recipe = {
	id: 'name',
	type: 'recipe',
	description: 'lskdf s dk skd flsd',
	createdUser: 'user id',
	createdTime: 'date object', 
	servingSize: 300,
	perUnit: {
		cal: 10, // calories
		pro: 10, // protein
		car: 10, // carbohydrates
		fat: 10, // total fat
		sat: 10, // saturated fat
		uns: 10, // unsaturated fat
		sug: 10, // sugar
		nsc: 10, // non-sugar carb
		fib: 10, // fiber
		cho: 10, // cholesterol
		sod: 10, // sodium
	},
	itemList: [{
		amount: 200,
		item: 'item id'
	}]
}

var day = {
	id: 'name',
	type: 'day',
	description: 'lskdf s dk skd flsd',
	createdUser: 'user id',
	createdTime: 'date object',
	itemList: [{
		amount: 200,
		item: 'item id'
	}]
}