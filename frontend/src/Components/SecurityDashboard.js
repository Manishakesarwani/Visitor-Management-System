import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';

const SecurityDashboard = () => {

    const {user} = UseAuthorizationContext();
    const [securitynfo, setSecurityInfo] = useState();

    const fetchAdminStatics = async()=>{
            const response = await fetch(`${process.env.RENDER_URL}/api/security/dashboard`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-type": "application/json"
                }
            });

            const json = await response.json();

            if(response.ok){
                setSecurityInfo(json);
            }
    }

    useEffect(()=>{

        fetchAdminStatics();

    },[]);
  return (
    <div className='security'>
        <h3>Welcome, {user.Name}!</h3>
        <div className='securityDashboard'>
            {securitynfo && <div><h2><i className="bi bi-check-circle-fill"></i> Today Check-Ins</h2><hr /><p>{securitynfo.t_chkin}</p></div>}
            {securitynfo && <div><h2><i className="bi bi-person-badge-fill"></i> Total Visitors Inside</h2><hr /><p>{securitynfo.t_chk}</p></div>}
            {securitynfo && <div><h2><i className="bi bi-person-badge"></i> Expired Passes</h2><hr /><p>{securitynfo.expired_passes_count}</p></div>}
        </div>
    </div>
  )
}

export default SecurityDashboard