const express = require('express')

const bodyParser = require('body-parser')
const app = express();
const port = 8000;

const fakeDB = {
	flavors: [
		{ vanilla: 2 },
		{ cocoa: 5 },
		{ strawberry: 1 },
		{ gold: 8 }
	],
	customers: [{
		name: 'John',
		favoriteFlavor: 'vanilla'
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
app.get('/api/flavors', (req, res) => {
	const toGive = fakeDB.flavors
	res.json(toGive)
});

app.get('/api/flavor/:type', (req, res) => {
	const type = req.params.type
	const give = { count: fakeDB.flavors[type] }
	if (give.count === undefined || give === 0)
		(res.send('out of stock'))
	else res.send(give)
});

app.post('/api/flavor', (req, res) => {
	const newFlavor = req.body.newFlavor
	const stock = req.body.stock
	fakeDB.flavors.push({ [newFlavor]: stock })
	fakeDBString = JSON.stringify(fakeDB)
	res.send(fakeDBString)
})

// customers API
app.get('/api/customers', (req, res) => {
	const toGive = fakeDB.customers
	res.json(toGive)
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});