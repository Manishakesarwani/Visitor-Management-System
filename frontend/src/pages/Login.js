import React, { useEffect, useState } from 'react'
import * as bootstrap from 'bootstrap';
import { UseLogin } from '../hooks/UseLogin';

const Login = () => {

    const {login, error, isLoading} = UseLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);
        setEmail("");
        setPassword("");
    }
    // Tooltip Script
    useEffect(()=>{
      const tooltips = document.querySelectorAll(".tt");
      console.log(tooltips)
        tooltips.forEach(t=>{
            new bootstrap.Tooltip(t);
        });
    },[]);

  return (
    <div className='login'>
        <form onSubmit={handleLogin}>
            {error && (<div className='error'>{error}</div>)}
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} name='email' id='email' placeholder='e.g. example@test.com' />
            </div>
            <div>
                <label htmlFor='password'>Password <span className='tt' data-bs-toggle="tooltip" data-bs-placement="right" title="Password must be atleast 8 characters, include uppercase, lowercase, number and special character.">ℹ️</span></label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name='password' id='password' placeholder='e.g. testTEST@03' />
            </div>
            <div><button type='submit' disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button></div>
        </form>
    </div>
  )
}

export default Login