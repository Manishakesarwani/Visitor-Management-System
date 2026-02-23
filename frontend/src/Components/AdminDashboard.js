import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import Reports from './Reports';
import ExportAppointmentReport from "./ExportAppointmentReport"
import ExportAppAppointments from './ExportAppAppointments';
import ExportRejectedAppointments from './ExportRejectedAppointments';
import ExportPasses from './ExportPasses';
import ExportChecklogs from './ExportChecklogs';



const AdminDashboard = () => {

    const {user} = UseAuthorizationContext();
    const [adminInfo, setAdminInfo] = useState();

    const fetchAdminStatics = async()=>{
            const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/admin/dashboard`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-type": "application/json"
                }
            });

            const json = await response.json();

            if(response.ok){
                setAdminInfo(json);
            }
    }

    useEffect(()=>{

        fetchAdminStatics();

    },[]);
  return (
    <div className='admin'>
        <h3>Welcome, {user.Name}!</h3>
        <div className='adminDashboard'>
            {adminInfo && <div><h2><i className="bi bi-people"></i> Total Visitor </h2> <hr /> <p>{adminInfo.t_v}</p>{adminInfo.t_v>0 && (<Reports />)}</div>}
            {adminInfo && <div><h2><i className="bi bi-calendar"></i> Total Appointments</h2> <hr /> <p>{adminInfo.t_a}</p>{adminInfo.t_a>0 && (<ExportAppointmentReport />)}</div>}
            {adminInfo && <div><h2><i className="bi bi-calendar-check-fill"></i> Total Approved Appointments</h2> <hr /> <p>{adminInfo.a_a}</p>{adminInfo.a_a>0 && (<ExportAppAppointments />)}</div>}
            {adminInfo && <div><h2><i className="bi bi-calendar-x-fill"></i> Total Rejected Appointments</h2> <hr /> <p>{adminInfo.r_a}</p>{adminInfo.r_a>0 && (<ExportRejectedAppointments />)}</div>}
            {adminInfo && <div><h2><i className="bi bi-person-badge-fill"></i> Active Passes</h2> <hr /> <p>{adminInfo.a_p_count}</p>{adminInfo.t_passes>0 && (<ExportPasses />)}</div>}
            {adminInfo && <div><h2><i className="bi bi-check-circle-fill"></i> Today Check-Ins</h2> <hr /> <p>{adminInfo.t_chkin}</p>{adminInfo.t_checklogs>0 && (<ExportChecklogs />)}</div>}
        </div>
    </div>
  )
}

export default AdminDashboard