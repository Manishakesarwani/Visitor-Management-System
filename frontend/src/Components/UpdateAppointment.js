import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import { UseUpdateAppointment } from '../hooks/UseUpdateAppointment';
import { UseGetAppointments } from '../hooks/UseGetAppointments';

const UpdateAppointment = ({Status, ID}) => {

    const [status, setStatus] = useState("");
    const [eligible, setEligible] = useState("");
    const {user} = UseAuthorizationContext();
    const {updateStatus, updateAppointment} = UseUpdateAppointment();
    const {getAllAppointments} = UseGetAppointments();
    const [hideA, setHideA] = useState(false);
    const [hideR, setHideR] = useState(false);

    const handleApprove = async(e) => {
        e.preventDefault();

        const success = await updateAppointment(ID, "approve");

        if(success){
            await getAllAppointments();
        }
        // console.log("approve");
        // console.log(ID);
    }
    const handleReject = async (e) => {
        e.preventDefault();
        // console.log("reject");

        const success = await updateAppointment(ID, "rejected");

        if(success){
            await getAllAppointments();
        }
    }

    useEffect(()=>{
        // console.log(eligible);

        if(user.Role==="employee" || user.Role==="admin"){
            setEligible(true);
        }
        else{
            setEligible(false);
        }

        if(Status==="pending"){
            setStatus("Pending");
            setHideA(false);
            setHideR(false);
        }
        else if(Status==="approve"){
            setStatus("Approved");
            setHideA(true);
            setHideR(true);
        }
        else if(Status==="rejected"){
            setStatus("Rejected");
            setHideR(true);
            setHideA(true);
        }
    }, [Status, user, hideA, hideR])
  return (
    <div className='update_app'>
        <div className='appointments_status'><span><strong>Status:</strong> {updateStatus ? "Updating..." : status}</span></div>
        {eligible && (
            <div className='appointment-icons'>
                <i className={hideA ? `bi bi-check hide` : `bi bi-check app-icon`} onClick={handleApprove}></i>
                <i className={hideR ? `bi bi-x hide` : `bi bi-x rej-icon`} onClick={handleReject}></i>
            </div>
        )}
    </div>
  )
}

export default UpdateAppointment