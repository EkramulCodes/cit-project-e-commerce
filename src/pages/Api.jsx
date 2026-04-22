import React, { useState } from 'react';
import { useGetProductsQuery, useRegisterUserMutation } from '../services/api';

const Api = () => {
  // Unused state from original vanilla demo
  // const [data, setData] = useState([]);
  // Unused state from original vanilla demo
  // const [loading, setLoading] = useState(false);
  // Unused
  // const [registerErrorLocal, setRegisterErrorLocal] = useState(null);

  const { data: productsData, isLoading, queryError } = useGetProductsQuery({ limit: 5, skip: 0 });
  const [
    registerUser,
    { data: registerResult, isLoading: registerLoading, error: registerError }
  ] = useRegisterUserMutation();
  
  const products = productsData?.products || [];

  // Simple form state for registration demo
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await registerUser(formData).unwrap();
      console.log('User registered successfully!');
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  // No useEffect needed - RTK Query handles it

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>RTK Query Demo (Products & Mutation)</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => window.location.reload()} 
          disabled={isLoading} 
          style={buttonStyle}
        >
          {isLoading ? 'Loading...' : 'Refresh Page (Refetch)'}
        </button>
      </div>
      
      {/* Registration Form Demo */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Register User (RTK Mutation)</h3>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          style={{ ...inputStyle, marginRight: '10px' }}
          disabled={registerLoading}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ ...inputStyle, marginRight: '10px' }}
          disabled={registerLoading}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ ...inputStyle, marginRight: '10px' }}
          disabled={registerLoading}
        />
        <button 
          onClick={handleRegister} 
          disabled={registerLoading}
          style={{ ...buttonStyle, backgroundColor: '#28a745' }}
        >
          {registerLoading ? 'Registering...' : 'Register'}
        </button>
        {registerError && <p style={{ color: 'red', fontSize: '14px' }}>Register error: {registerError?.data?.message || 'Failed'}</p>}
        {registerResult && <p style={{ color: 'green' }}>Success! ID: {registerResult.id}</p>}
      </div>

      {queryError && <p style={{ color: 'red' }}>{queryError.toString()}</p>}

      <div style={{ display: 'grid', gap: '10px' }}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{product.title}</h3>
            <p>{product.description.substring(0, 100)}...</p>
            <p style={{ fontWeight: 'bold', color: '#28a745' }}>${product.price}</p>
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

const inputStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '5px',
  width: '150px'
};

export default Api;