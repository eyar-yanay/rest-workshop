import React, { useEffect, useState } from 'react';
import './App.css';
import { _ARRAY_OF_NUMBERS, _SERVER_ERROR } from './const';

function AnswersDontLook() {
  // states for data from server
  const [allFlavors, setAllFlavors] = useState();
  const [customer, setCustomer] = useState();

  // state for inputs
  const [newFlavor, setNewFlavor] = useState("");
  const [newStock, setNewStock] = useState(1);
  const [searchFlavor, setSearchFlavor] = useState();
  const [amountFlavor, setAmountFlavor] = useState(1);

  // handle functions for inputs
  const handleFlavorChange = (e) => {
    setSearchFlavor(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmountFlavor(e.target.value);
  };
  const handleNewFlavorChange = (e) => {
    setNewFlavor(e.target.value);
  };
  const handleNewStockChange = (e) => {
    setNewStock(e.target.value);
  };

  // fetch functions
  const getFlavors = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/flavor"); // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setAllFlavors(data); // setting the data to the state
      setSearchFlavor(data[0].name); // setting the first flavor to the search flavor
    } catch (error) {
      alert(_SERVER_ERROR);
    }
  };
//first mission
  const getCustomer = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/customer/2"); // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setCustomer(data); // setting the data to the state
    } catch (error) {
      alert(_SERVER_ERROR);
    }
  };
  // excute the fetch functions when the component is mounted
  useEffect(() => {
    getFlavors();
    getCustomer();
  }, []);



  // second mission: buy a flavor by name and quantity using searchFlavor and amountFlavor states. here 
  const updateFlavorAmount = async () => {
    try {
      await fetch(`http://localhost:8000/api/flavor?flavor=${searchFlavor}&amount=${amountFlavor}`, { method: 'PUT' }); // fetching the data from the server
    } catch (error) {
      alert(_SERVER_ERROR);
      throw error;
    }
  };

  // third mission: add a new flavor - passing amount and flavor name using body
  const postFlavor = async () => {
    try {
      if (newFlavor === '' || newStock === '') {
        alert("please fill all fields");
        return;
      }
      await fetch("http://localhost:8000/api/flavor", {
        method: "POST", body: JSON.stringify({ newFlavor: newFlavor, stock: newStock }), headers: {
          "Content-Type": "application/json"
        }

      }); //posting data with body as example
    } catch (error) {
      console.error(error);
    }
  };


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
                return <div>{flavor.name}: {flavor.amount}</div>; // mapping the data to the screen
              })
            }
            <div>
              <button onClick={async () => { await postFlavor(); getFlavors(); }}>Post data</button>
              <input type="text" placeholder="new flavor" value={newFlavor} onChange={handleNewFlavorChange} />
              <select placeholder='amount' value={newStock} onChange={handleNewStockChange}>
                {_ARRAY_OF_NUMBERS.map(number => {
                  return <option value={number}>{number}</option>;
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
              return <option value={number}>{number}</option>;
            })}
          </select>

          {/* <input type="text" placeholder="search flavor" value={searchFlavor} onChange={handleFlavorChange} /> */}
          {allFlavors && <select placeholder='flavor name' value={searchFlavor} onChange={handleFlavorChange}>
            {allFlavors.map(flavor => {
              return <option value={flavor.name}>{flavor.name}</option>;
            })}
          </select>}
          <button onClick={async () => { await updateFlavorAmount(); await getFlavors(); }}>update</button>
        </div>
      </div>
    </div>
  );
}

export default AnswersDontLook;
