import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) && email.endsWith('.com');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if username is valid
        if (!validateEmail(email)) {
            setMessage("Invalid email. Please use a valid .com email address.");
            return;
        }
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
    
        try {
            // Send the request to the backend
            const response = await axios.post('http://localhost:8000/signup', {
                username: email,  // Updated to 'username' for backend compatibility
                password: password,
            });
    
            if (response && response.data) {
                setMessage(response.data.message);
            } else {
                setMessage("An unexpected error occurred");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                const detail = error.response.data.detail;
                setMessage(Array.isArray(detail) ? detail[0].msg : detail);
            } else {
                setMessage("An error occurred. Please try again later.");
            }
        }
    };
    
    

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label>Confirm Password</label>
                </div>
                <button type="submit">Signup</button>
            </form>
            <p className="message">{message}</p>
            <p>
                Already have an account?{' '}
                <a href="/" className="login-link">Login here</a>
            </p>
        </div>
    );
};



export default Signup;

