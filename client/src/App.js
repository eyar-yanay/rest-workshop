import React, { useEffect, useState } from 'react';
import './App.css';
import { _ARRAY_OF_NUMBERS, _SERVER_ERROR } from './const';

function App() {
  // states for data from server
  const [allFlavors, setAllFlavors] = useState([]);
  const [customer, setCustomer] = useState();

  // state for inputs
  const [newFlavor, setNewFlavor] = useState("");
  const [newStock, setNewStock] = useState(1);
  const [searchFlavor, setSearchFlavor] = useState();
  const [amountFlavor, setAmountFlavor] = useState(1);
  const [delFlavor, setDelFlavor] = useState();

  // handle functions for inputs
  const handleDelFlavor = (e) => {
    setDelFlavor(e.target.value)
  }

  const handleFlavorChange = (e) => {
    setSearchFlavor(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmountFlavor(e.target.value);
  }
  const handleNewFlavorChange = (e) => {
    setNewFlavor(e.target.value);
  }
  const handleNewStockChange = (e) => {
    setNewStock(e.target.value);
  }

  // execute the fetch functions when the component is mounted
  useEffect(() => {
    getFlavors();
    getCustomer();
  }, [])

  // example fetch functions
  const getFlavors = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/flavor") // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setAllFlavors(data); // setting the data to the state
    } catch (error) {
      alert(_SERVER_ERROR)
    }
  }

  const getCustomer = async () => {
    // first mission: get the customer with id 2 from the server by including the id in the url as a parameter
    const res = await fetch("http://localhost:8000/api/customer/1")
    const data = await res.json()
    setCustomer(data)
  }

  const updateFlavorAmount = async () => {
    // second mission: buy a flavor by name and quantity using searchFlavor and amountFlavor states. here 
    const res = await fetch(`http://localhost:8000/api/flavor?amount=${amountFlavor}&flavor=${searchFlavor}`, { method: "PUT" })
    const data = await res.json()
    setAllFlavors(data)
  }

  const postFlavor = async () => {
    // third mission: add a new flavor - passing amount and flavor name using body
    const body = { newFlavor: newFlavor, newStock: newStock }
    const res = await fetch('http://localhost:8000/api/flavor',
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ 'content-type': 'application/json' })
      })
    const data = await res.json()
    setAllFlavors(data)
  }

  //fourth mission: create a delete flavor functionality
  //1. create in the client a component to select a flavor from stock
  //2. create a button that deletes a flavor
  //3. create a handleClick function that sends to server a fetch req to delete selected item
  //4. tip: use any one of the methods that was used during this exercise (param, query or body)
  const deleteFlavor = async () => {
    console.log('delFlavor: ', delFlavor);
    const res = await fetch(`http://localhost:8000/api/customer/exampleParam/${delFlavor}`, { method: "DELETE" })
    const data = await res.json()
    setAllFlavors(data)
  }


  return (
    <div className="App">
      <div className="container">
        {allFlavors &&
          <div className="message">
            <div >
              <h1>welcome to our ice cream store</h1>
            </div>
            <h3>our stock right now:</h3>

            {
              allFlavors.map(flavor => {
                return <div>{flavor.name}: {flavor.amount}</div> // mapping the data to the screen
              })
            }

            <div>
              <button onClick={async () => { await postFlavor(); getFlavors() }}>Post data</button>
              <input type="text" placeholder="new flavor" value={newFlavor} onChange={handleNewFlavorChange} />
              <select placeholder='amount' value={newStock} onChange={handleNewStockChange}>
                {_ARRAY_OF_NUMBERS.map(number => {
                  return <option value={number}>{number}</option>
                })}
              </select>
            </div>
          </div>

        }

        {customer &&
          <div className="customers">
            <h4>our customers:</h4>
            <div>[{customer.name}] we know that his favorite Flavor is: {customer.favoriteFlavor}</div>
          </div>
        }

        <div className="search-flavor">
          <h4>update the stock:</h4>
          <select placeholder='amount' value={amountFlavor} onChange={handleAmountChange}>
            {_ARRAY_OF_NUMBERS.map(number => {
              return <option value={number}>{number}</option>
            })}
          </select>

          {allFlavors && <select placeholder='flavor name' value={searchFlavor} onChange={handleFlavorChange}>
            {allFlavors.map(flavor => {
              return <option value={flavor.name}>{flavor.name}</option>
            })}
          </select>}z
          <button onClick={() => { updateFlavorAmount(); getFlavors() }}>update</button>
        </div>

        <div className="search-flavor">
          <h4>Remove a flavor:</h4>
          {allFlavors && <select placeholder='flavor name' value={delFlavor} onChange={handleDelFlavor}>
            {allFlavors.map(flavor => {
              return <option value={flavor.name}>{flavor.name}</option>
            })}
          </select>}z
          <button onClick={() => { deleteFlavor(); getFlavors() }}>delete</button>
        </div>

      </div>
    </div>
  );
}

export default App;
