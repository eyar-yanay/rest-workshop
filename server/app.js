const express = require('express')

const bodyParser = require('body-parser')
const app = express();
const port = 8000;

const fakeDB = {
	flavors: {
		vanilla: 2,
		cocoa: 5,
		strawberry: 1,
		gold: 8
	},
	customers: {

	}
}

app.use(bodyParser.json())
app.get('/api/', (req, res) => {
	res.send({ data: 'your server is working (;' })
});

app.get('/api/flavors', (req, res) => {
	res.send(fakeDB.flavors)
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
	Object.assign(fakeDB.flavors, { [newFlavor]: stock })

	// cleaner way to do the same thing
	// fakeDB.flavors[newFlavor] = stock
	fakeDBString = JSON.stringify(fakeDB)
	res.send(fakeDBString)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});
