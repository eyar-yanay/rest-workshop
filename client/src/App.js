import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [message, setMessage] = useState();

  useEffect(() => {
    (async () => {
      //make the fetch request here (in a try & catch block), and enter the data you receive to the message state
    })();
  }, []);

  const handleClick = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/flavors")
      console.log('data: ', data);
      // setMessage(data)
    } catch (error) {

      console.log(error)
      setMessage("error! :", error)
    }
  }

  return (
    <div className="App">
      <h1>Hola</h1>
      {message &&
        <div className="message">
          {message}
        </div>}
      <button onClick={handleClick}>Fetch data</button>
    </div>
  );
}

export default App;
