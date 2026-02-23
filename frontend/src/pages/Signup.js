import React, { useEffect, useState } from 'react'
import * as bootstrap from 'bootstrap';
import { UseSignup } from '../hooks/UseSignup';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const {signup, error, isLoading} = UseSignup();

    const handleSignup = async (e) => {
        e.preventDefault();

        await signup(name, email, password, role);

        setName("");
        setEmail("");
        setPassword("");
        setRole("");
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
    <div className='signup'>
        <form onSubmit={handleSignup}>
            {error && (<div className='error'>{error}</div>)}
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text' value={name} onChange={(e)=> setName(e.target.value)} name='name' id='name' placeholder='e.g. John Cotton' />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} name='email' id='email' placeholder='e.g. example@test.com' />
            </div>
            <div>
                <label htmlFor='password'>Password <span className='tt' data-bs-toggle="tooltip" data-bs-placement="right" title="Password must be atleast 8 characters, include uppercase, lowercase, number and special character.">ℹ️</span></label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name='password' id='password' placeholder='e.g. testTEST@03' />
            </div>
            <div>
                <label htmlFor='role'>Role</label>
                <select id='role' value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="security">Security</option>
                </select>
            </div>
            <div>
                <button type='submit' disabled={isLoading}>{isLoading ? "Signing in..." : "Signup"}</button>
            </div>
        </form>
    </div>
  )
}

export default Signup