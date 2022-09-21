const express = require('express');

const bodyParser = require('body-parser');
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
		name: 'Nati',
		favoriteFlavor: 'chocolate'
	}, {
		id: 3,
		name: 'Bob',
		favoriteFlavor: 'strawberry'
	}]
};

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});

app.use(bodyParser.json());

app.get('/api/', (req, res) => {
	res.send({ data: 'your server is working (;' });
});

// flavors API
app.get('/api/flavor', (req, res) => {
	const toGive = fakeDB.flavors;
	res.json(toGive);
});


//! First Mission - create a route that return one customer by id from req.params
app.get('/api/customer/:id', (req, res) => {
	const toGive = fakeDB.customers.find(customer => customer.id == req.params.id);
	res.json(toGive);
});

//! Second Mission - (PUT) create a route that handle buying ice cream flavor by id from req.query
app.put('/api/flavor', (req, res) => {
	const flavor = req.query.flavor;
	const amount = parseInt(req.query.amount);

	// update the flavor stock
	const flavorIndex = fakeDB.flavors.findIndex(currentFlavor => currentFlavor.name === flavor);
	if (flavorIndex !== -1) {
		fakeDB.flavors[flavorIndex] = {
			name: fakeDB.flavors[flavorIndex].name,
			amount: amount
		};
		res.json(fakeDB.flavors);
	} else {
		res.json("not found");
	}
});

//! Third Mission - (Post) create a route that handle adding new flavor to the fakeDB.flavors through req.body
app.post('/api/flavor', (req, res) => {
	const newFlavor = req.body.newFlavor;
	const stock = parseInt(req.body.newStock)
	// search if the flavor is already exists 
	const flavorIndex = fakeDB.flavors.findIndex(flavor => flavor.name === newFlavor);
	if (flavorIndex !== -1) { // if flavor is found
		fakeDB.flavors[flavorIndex] = {
			name: fakeDB.flavors[flavorIndex].name,
			amount: fakeDB.flavors[flavorIndex].amount + stock
		};
	} else {
		fakeDB.flavors.push({
			name: newFlavor,
			amount: stock
		});
	}
	res.json(fakeDB.flavors);
});

//! Extra Mission - (Delete) create a route that handle deleting flavor from the fakeDB.flavors through req.params
app.delete('/api/customer/exampleParam/:delFlavor', (req, res) => {
	const delFlavor = req.params.delFlavor
	const delIndex = fakeDB.flavors.findIndex(flavor => flavor.name === delFlavor)
	if (delIndex !== -1) {
		fakeDB.flavors.splice(delIndex, 1)
	}
	res.json(fakeDB.flavors)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});