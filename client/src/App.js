import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [message, setMessage] = useState();
  useEffect(() => {
    (async () => {
      //make the fetch request here (in a try & catch block), and enter the data you receive to the message state
    })();
  }, []);

  return (
    <div className="App">
      <h1>Hola</h1>
      {message &&
        <div className="message">
          {message}
        </div>}
    </div>
  );
}

export default App;
