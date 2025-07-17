import '../styles/signin.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
    const response = await fetch('http://localhost:3034/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: email,
        password,
      }),
    });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
    navigate('/dashboard');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="signin-form">
        <input
          type="text"
          placeholder="Name"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="signin-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="signin-input"
        />
        <button type="submit" disabled={loading} className="signin-button">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <div className="signin-error">{error}</div>}
      </form>
    </div>
  );
};

export default SignIn;
