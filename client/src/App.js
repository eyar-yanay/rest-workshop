import React, { useEffect, useState } from 'react';
import './App.css';
import { _ARRAY_OF_NUMBERS, _SERVER_ERROR } from './const';

function App() {
  // states for data from server
  const [allFlavors, setAllFlavors] = useState();
  const [customer, setCustomer] = useState();

  // state for inputs
  const [newFlavor, setNewFlavor] = useState();
  const [searchFlavor, setSearchFlavor] = useState();
  const [amountFlavor, setAmountFlavor] = useState(1);

  // handle functions
  const handleFlavorChange = (e) => {
    setSearchFlavor(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmountFlavor(e.target.value);
  }

  // fetch functions
  const getFlavors = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/flavor") // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setAllFlavors(data); // setting the data to the state
    } catch (error) {
      alert(_SERVER_ERROR)
    }
  }

  const getCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/customer/2") // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)
      setCustomer(data); // setting the data to the state
    } catch (error) {
      alert(_SERVER_ERROR)
    }
  }
  
  useEffect(()=>{
    getFlavors();
    getCustomers();
  },[])
  


  // search by flavor name, if not found a flavor return "no match"
  // if flover is found and there is some stock, return the amount of stock by number 
  // if flover is found and there is no stock, return "out of stock"
  const search = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/flavor/buy?value=${searchFlavor}&amount=${amountFlavor}`) // fetching the data from the server
      const data = await res.json(); // converting the data to json from stringJSON (string)

      if (data === 'not found') {
        alert("not found flavor")
      }
      else if (data === "out of stock") {
        alert("out of stock")
      } else {
       alert("you bought " + amountFlavor + " " + searchFlavor)
      }
    } catch (error) {
      alert(_SERVER_ERROR)
    }
  }


  return (

    <div className="App">
      <div className="container">

        <div >
          <h1>welcome to our ice cream store</h1>
        </div>

        {allFlavors &&
          <div className="message">
            <h3>stock:</h3>
            {
              allFlavors.map(flavor => {
                return <div>{flavor.name}: {flavor.amount}</div> // mapping the data to the screen
              })
            }
          </div>}

        {customer &&

          <div className="customers">
            <h4>our customers:</h4>
           
               <div>[{customer.name}] we know that his favorite Flavor is: {customer.favoriteFlavor}</div>
          
          </div>
        }

        <div className="search-flavor">
          <h4>buy by flavor name:</h4>
          <select placeholder='amount' value={amountFlavor} onChange={handleAmountChange}>
            {_ARRAY_OF_NUMBERS.map(number => {
              return <option value={number}>{number}</option>
            })}
          </select>
          
          {/* <input type="text" placeholder="search flavor" value={searchFlavor} onChange={handleFlavorChange} /> */}
         { allFlavors && <select placeholder='flavor name' value={searchFlavor} onChange={handleFlavorChange}>
            {allFlavors.map(flavor => {
              return <option value={flavor.name}>{flavor.name}</option>
            })}
          </select> }          
          <button onClick={() => {search(); getFlavors()}}>buy</button>
        </div>
      </div>
    </div>
  );
}

export default App;
