import React, { useState } from 'react';
import './App.css';

function App() {
  // states for data from server
  const [allFlavors, setAllFlavors] = useState();
  const [customers, setCustomers] = useState();
  // state for inputs
  const [newFlavor, setNewFlavor] = useState();
  const [searchFlavor, setSearchFlavor] = useState();
  
  // handle functions
  const onClickFetch = () => {
    getFlavors();
    getCustomers();
  }

  const searchFlavorHandler = (e) => {
    setSearchFlavor(e.target.value);
  }

  // fetch functions
  const getFlavors = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/flavors") // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setAllFlavors(data); // setting the data to the state
    } catch (error) {
      console.error(error)
    }
  }

  const getCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/customers") // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setCustomers(data); // setting the data to the state
    } catch (error) {
      console.error(error)
    }
  }

  
  return (

    <div className="App">
      <div className="container">
      <h1>welcome to our ice cream store</h1>
      {allFlavors &&
        <div className="message">
          <h3>stock:</h3>
          {
            allFlavors.map(flavor => {
              return <div>{Object.keys(flavor)}: {Object.values(flavor)}</div> // mapping the data to the screen
            })
          }
        </div>}

        {customers &&
      
      <div className="customers">
          <h4>our customers:</h4>
         { customers.map(customer => {
            return <div>hi {customer.name}, we know that your favorite Flavor is: {customer.favoriteFlavor}</div>
          })}
      </div>
        }
      <button onClick={onClickFetch}>Fetch data</button>

        <div className="search-flavor">
          <input type="text" placeholder="search flavor" value={searchFlavor} onChange={searchFlavorHandler} />
        </div>
        </div>
    </div>
  );
}

export default App;
