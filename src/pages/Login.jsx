import React, { useState, useContext } from "react";            // hook para guardar estado
import { AuthContext } from "../contexts/auth";



export const Login = (props) => {


    const {authenticated, login} = useContext(AuthContext);

    const [username, setUsername] = useState('');     /* save email email = getter setEmail = setter*/
    const [password, setPassword] = useState('');       // save password


    const validatePassword = () => {
        const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passRegex.test(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            alert('Password must be at least 8 characters long and contain at least one capital letter');
            return;
        }

        console.log("Hello",{username, password});
        login(username, password)              // context + api implementation
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <p>{String(authenticated)}</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="text" placeholder="0x1337" id="username" name="username" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}