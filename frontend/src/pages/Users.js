import { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import { UseAddUsersViaAdmin } from '../hooks/UseAddUsersViaAdmin';
import { UseGetUsersViaAdmin } from '../hooks/UseGetUsersViaAdmin';

const Users = () => {

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("admin");

        const {user} = UseAuthorizationContext();
    
        const {signup, error, isLoading} = UseAddUsersViaAdmin();
        const {users, visError, iseUsersLoading, getAllUsers} = UseGetUsersViaAdmin();
    
        const handleSignup = async (e) => {
            e.preventDefault();
    
            const sucesss = await signup(name, email, password, role);

            if(sucesss){
                getAllUsers();
            }
    
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
        }
    
        // Tooltip Script
            useEffect(()=>{
                if(user){
                    getAllUsers();
                }
              const tooltips = document.querySelectorAll(".tt");
              console.log(tooltips)
                tooltips.forEach(t=>{
                    new bootstrap.Tooltip(t);
                });

                //eslint-disable-next-line react-hooks/exhaustive-deps
            },[user]);
    
  return (
    <div className='Users_page'>
        <div className='User_profile'>
            {iseUsersLoading && <h3>Loading...</h3>}
            {visError && <h3>{visError}</h3>}
               {!iseUsersLoading && !visError && users && users.map((v)=>(
                    <div key={v._id} className='vis1'>
                        <div>
                            <h4 className='visitor_name'>{v.Name}</h4>
                            <div className='visitors_info'><h5>Username: </h5>{v.Username}</div>
                            <div className='visitors_info'><h5>Role: </h5>{v.Role}</div>
                        </div>
                    </div>
                ))} 
        </div>
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
                    <option value="">Please select</option>
                    <option value="employee">Employee</option>
                    <option value="security">Security</option>
                </select>
            </div>
            <div>
                <button type='submit' disabled={isLoading}>{isLoading ? "Creating User..." : "Create User"}</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Users