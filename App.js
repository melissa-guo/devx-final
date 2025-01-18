import './App.css';
import React from 'react'
import { useState } from 'react'

function App() {

  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = React.useState([]);

  const handleChange = (event) => {
    setKeyword(event.target.value); 
  };

  const handleSearch = () => {
    fetch(`http://localhost:5001/api/places?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log data for debugging
        setPlaces(data.slice(0, 10)); // Update the 'places' state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };  

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Choose Your Next Adventure!
        </h2>
      </header>
      <div class="images">
        <img src="/adventure1.jpeg" alt="Adventure" className="adventure-image" />
        <img src="/adventure2.jpeg" alt="Adventure" className="adventure-image" />
        <img src="/adventure3.jpeg" alt="Adventure" className="adventure-image" />
      </div>
      <p>
        Input a keyword! (museums, intersting_places, attractions, ...)
      </p>
      <div>
        <input type="text" placeholder="Type here" value={keyword} onChange={handleChange}/>
        <div>
          <button onClick={handleSearch}>Search</button>
        </div>
        <ul>
          {places.map((place, index) => (
            <li key={index}>
              {place?.properties?.name || 'No name available'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
