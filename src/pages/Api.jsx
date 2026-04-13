import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Handling Fetch with async/await & try...catch
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Using axios for cleaner syntax (auto-converts to JSON)
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handling POST request with fetch API
  const addPost = async () => {
    const newPost = {
      title: 'Practice Post',
      body: 'Learning async/await in React',
      userId: 1,
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      
      const result = await response.json();
      alert(`Post added successfully! ID: ${result.id}`);
      // In a real app, it might add this to the local state
      setData([result, ...data]);
    } catch (err) {
      console.error("Post error:", err);
    }
  };

  // Run on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Async Programming Practice</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchData} disabled={loading} style={buttonStyle}>
          {loading ? 'Loading...' : 'Refresh List (GET)'}
        </button>
        <button onClick={addPost} style={{ ...buttonStyle, marginLeft: '10px', backgroundColor: '#28a745' }}>
          Add Sample Post (POST)
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gap: '10px' }}>
        {data.map((post) => (
          <div key={post.id} style={cardStyle}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Styles
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const buttonStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
};

export default Api;