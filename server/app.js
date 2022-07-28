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

// flavors API
app.get('/api/flavor', (req, res) => {
	const toGive = fakeDB.flavors
	res.json(toGive) //use res.json to return res as json
});

//customers API
app.get('/api/customer/:id', (req, res) => {
	//mission 1: return to client customer from FakeDB - specified by param
})

app.get('/api/flavor/buy', (req, res) => {
	// validate that query of value is existent
	const value = req.query.value
	const amount = req.query.amount

	const flavorIndex = fakeDB.flavors.findIndex(flavor => flavor.name === value)
	if (flavorIndex !== -1) { // if flavor is found
		if (fakeDB.flavors[flavorIndex].amount >= amount) { // if there is enough stock
			fakeDB.flavors[flavorIndex] = {
				name: fakeDB.flavors[flavorIndex].name,
				amount: fakeDB.flavors[flavorIndex].amount - amount
			}
		} else { // if there is not enough stock
			res.json('out of stock')
		}
		res.json(fakeDB.flavors[flavorIndex].amount)
	} else { // if flavor is not found
		res.json('not found')
	}
});

app.post('/api/flavor', (req, res) => {
		console.log(req.body)
		const newFlavor = req.body.newFlavor
		const stock = parseInt(req.body.stock)
		// search if the flavor is already exists 
		const flavorIndex = fakeDB.flavors.findIndex(flavor => flavor.name === newFlavor)
		if (flavorIndex !== -1) { // if flavor is found
			fakeDB.flavors[flavorIndex] = {
				name: fakeDB.flavors[flavorIndex].name,
				amount: fakeDB.flavors[flavorIndex].amount + stock
			}
		} else {
		fakeDB.flavors.push({
			name: newFlavor,
			amount: stock
		})}
		res.json(fakeDB)
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});