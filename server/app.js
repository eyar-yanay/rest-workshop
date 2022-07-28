const express = require('express')

const bodyParser = require('body-parser')
const app = express();
const port = 8000;

let fakeDB = {
	flavors: [
		{ name: "vanilla", amount: 2 },
		{ name: "chocolate", amount: 5 },
		{ name: "strawberry", amount: 1 },
		{ name: "mint", amount: 8 }
	],
	customers: [{
		id: 1,
		name: 'John',
		favoriteFlavor: 'vanilla'
	}, {
		id: 2,
		name: 'Jane',
		favoriteFlavor: 'chocolate'
	}, {
		id: 3,
		name: 'Bob',
		favoriteFlavor: 'strawberry'
	}]
}

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next()
});

app.use(bodyParser.json())
app.get('/api/', (req, res) => {
	res.send({ data: 'your server is working (;' })
});
// get all flavors from the fakeDB
app.get('/api/flavor', (req, res) => {
	const toGive = fakeDB.flavors
	res.json(toGive) //use res.json to return res as json
});

//customers API
app.get('/api/customer/:id', (req, res) => {
	//First Mission: return to client customer from FakeDB - specified by param
})

// Second Mission - (PUT) create a route that handles buying ice cream flavor by id from req.query, recive flavor and amount from query
	
// Third Mission - (Post) create a route that handle adding new flavor to the fakeDB. receive flavors through req.body

// Extra Mission - (Delete) create a route that handle deleting flavor from the fakeDB.flavors through req.params

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});