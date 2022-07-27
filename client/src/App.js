import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [message, setMessage] = useState();

  const getFlavors = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/flavors")
      const data = await res.text()
      setMessage(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h1>Hola</h1>
      {message &&
        <div className="message">
          {message}
        </div>}
      <button onClick={getFlavors}>Fetch data</button>
    </div>
  );
}

export default App;
