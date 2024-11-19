import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) && email.endsWith('.com');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email is valid and ends with .com
        if (!validateEmail(email)) {
            setMessage("Invalid email. Please use a valid .com email address.");
            return;
        }


        try {
            // Send the request to the backend
            const response = await axios.post('http://localhost:8000/login', {
                username: email,
                password: password,
            });

            // Check if the response has data and message
            if (response && response.data) {
                setMessage(response.data.message);
                // Redirect to the dashboard and pass the email
                navigate('/dashboard', { state: { username: email } });
            } else {
                setMessage("An unexpected error occurred");
            }
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Email</label>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Password</label>
                </div>
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
            <p>
                Don't have an account?{' '}
                <a href="/signup" className="signup-link">signup here</a>
            </p>
        </div>
    );
};

export default Login;
