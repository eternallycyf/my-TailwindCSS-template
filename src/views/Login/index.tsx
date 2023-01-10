import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate()
  // const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login(email, password);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Button onClick={() => navigate('/login')}>to login</Button>
    </div>
  );
};

export default Login;