import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; 

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(name, email);
      navigate("/search");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter your details</legend>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Your full name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Your email address"
          />
        </fieldset>
        <button type="submit" aria-live="polite">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;