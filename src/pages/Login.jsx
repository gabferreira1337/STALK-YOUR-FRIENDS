import React, { useState, useContext } from "react";            // hook para guardar estado
import { AuthContext } from "../contexts/auth";



export const Login = (props) => {


    const {authenticated, login} = useContext(AuthContext);

    const [email, setEmail] = useState('');     /* save email email = getter setEmail = setter*/
    const [pass, setPass] = useState('');       // save password

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hello",{email, pass});
        login(email, pass)              // context + api implementation
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <p>{String(authenticated)}</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}