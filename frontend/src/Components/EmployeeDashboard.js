import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';

const EmployeeDashboard = () => {

    const {user} = UseAuthorizationContext();
    const [employeeInfo, setEmployeeInfo] = useState();

    const fetchAdminStatics = async()=>{
            const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/employee/dashboard`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-type": "application/json"
                }
            });

            const json = await response.json();

            if(response.ok){
                setEmployeeInfo(json);
            }
    }

    useEffect(()=>{

        fetchAdminStatics();
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return (
    <div className='employee'>
        <h3>Welcome, {user.Name}!</h3>
        <div className='employeeDashboard'>
        {employeeInfo && <div><h2><i className="bi bi-calendar"></i> My Total Appointments</h2><hr /><p>{employeeInfo.total_emp_app}</p></div>}
        {employeeInfo && <div><h2><i className="bi bi-calendar-check-fill"></i> Total Approved Appointments</h2><hr /><p>{employeeInfo.approve_emp_app}</p></div>}
        {employeeInfo && <div><h2><i className="bi bi-calendar-minus"></i> Pending Approvals</h2><hr /><p>{employeeInfo.pending_emp_app}</p></div>}
        {employeeInfo && <div><h2><i className="bi bi-calendar-x-fill"></i> Total Rejected Appointments</h2><hr /><p>{employeeInfo.rejected_emp_app}</p></div>}
        </div>
    </div>
  )
}

export default EmployeeDashboard