import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext'
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import SecurityDashboard from './SecurityDashboard';
import { Link } from "react-router-dom"

const Dashboard = () => {

    const {user} = UseAuthorizationContext();
    const [passAccess, setPassAccess] = useState(false);


    useEffect(()=>{
        if(user.Role==="admin" || user.Role==="security"){
          setPassAccess(true);
        }
        else{
          setPassAccess(false);
        }
      }, [user, passAccess]);
   
  return (
    <div>
      <div className="nav-links">
        <div className='Visitors_link'>
          {user && (
              <Link to="/visitors">Visitors</Link>
          )}
        </div> 
        <div className='Appointments_link'>
          {user && (
              <Link to="/appointments">Appointments</Link>
          )}
        </div>
          {user && passAccess && (
            <div className='Pass_link'>
              <Link to="/pass">Passes</Link>
            </div>
          )}
          {user.Role==="admin" && (
            <div className='addUsers'>
              <Link to="/admin/user">Create user</Link>
            </div>
          )}
      </div>
      <div className='dashboard'>
        {user.Role === "admin" && (<AdminDashboard />)}
        {user.Role === "employee" && (<EmployeeDashboard />)}
        {user.Role === "security" && (<SecurityDashboard />)}
      </div>
      
    </div>
  )
}

export default Dashboard