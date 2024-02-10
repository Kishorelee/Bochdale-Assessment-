import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    let url = 'https://jsonplaceholder.typicode.com/posts';
    if (categoryFilter) {
      url += `?category=${categoryFilter}`;
    }
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [categoryFilter]);

  const handleCategoryChange = event => {
    setCategoryFilter(event.target.value);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>BochDale</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact Us</a></li>
          
        </ul>
      </nav>
      <div className="content">
        <h2>Product List</h2>
        <p>Welcome to our product list. Here you can find a variety of items.</p>
        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more options for different categories */}
        </select>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Product List App</p>
      </footer>
    </div>
  );
}

export default App;
