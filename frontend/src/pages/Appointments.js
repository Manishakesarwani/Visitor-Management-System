import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import { UseGetAppointments } from '../hooks/UseGetAppointments';
import {format, formatDistanceToNow} from "date-fns";
import { UseGetVisitors } from '../hooks/UseGetVisitors';
import { UseCreateAppointment } from '../hooks/UseCreateAppointment';
import UpdateAppointment from '../Components/UpdateAppointment';
import FilterAppointments from '../Components/FilterAppointments';

const Appointments = () => {

    const {isLoading, appointments, appError, isEligibleToCreate, getAllAppointments} = UseGetAppointments();
    const {user} = UseAuthorizationContext();
    const{visitors, getAllVisitor} = UseGetVisitors();
    const {appointmentLoading, appointmentError, appointmentSuccess, setAppointment} = UseCreateAppointment();

    const [visitorId, setVisitorId] = useState("");
    const [objective, setObjective] = useState("");
    const [date, setDate] = useState("");

    const handleAppointment = async(e) => {
        e.preventDefault();


        const success = await setAppointment(visitorId, objective, date);

        // console.log(success);

        if(success){
            await getAllVisitor();
            await getAllAppointments();
        }
        setVisitorId("");
        setObjective("");
        setDate("");
    }

    useEffect(()=>{
        if(user){
            getAllAppointments();
            getAllVisitor();   
        }
        // console.log("Appointments", appointments);
        // console.log("Visitors", visitors);

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

  return (
    <div className={isEligibleToCreate ? 'Appointments_page' : 'Appointments_pageExtra'}>
        {isLoading && (<h3>Loading...</h3>)}
        {!isLoading && (<div className='appointments'>
            {appError && <h3>{appError}</h3>}
            <div className='appointment_list'>
                {!appError && user && appointments && (<FilterAppointments />)}
                
                {!appError && user && appointments && appointments.map((a)=>(
                <div key={a._id}>
                    <div className='appointments_details'>
                        <div className='Visitor_Details'>
                            <h4>{a.VisitorId.Name}</h4>
                            <span>Visitor username: {a.VisitorId.Username}</span>
                            <span>Visitor mobile no.: {a.VisitorId.PhoneNumber}</span>
                            <span>Appointment on: {format(new Date(a.When), "MM/dd/yyyy")}</span>
                            <span>Purpose: {a.Objective}</span>
                        </div>
                        <div className='employee_details'>
                            <h4>Created By: {a.EmployeeId.Name}</h4>
                            <span>Username: {a.EmployeeId.Username}</span>
                            <span>Role: {a.EmployeeId.Role}</span>
                            <UpdateAppointment Status={a.Status} ID={a._id} />
                        </div>
                    </div>
                    <div className='appointments_created'>Created At: {formatDistanceToNow(new Date(a.createdAt), {addSuffix: true})}</div>
                </div>
            ))}
            </div>
        </div>)}
        {isEligibleToCreate && (<div className='appointment_form'>
                <h3>Appointment Form</h3>
                <form onSubmit={handleAppointment}>
                    {appointmentError && (<div className='error'>{appointmentError}</div>)}
                    {appointmentSuccess && (<div className='success'>Appointment Created successfully!</div>)}
                    <div>
                        <label htmlFor='ID'>Select Visitor</label>
                        <select id='ID' value={visitorId} onChange={(e)=> setVisitorId(e.target.value)}>
                            <option value="">Please select</option>
                            {visitors && visitors.map((v)=>(
                                <option key={v._id} value={v._id}>{v.Name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='Objective'>Purpose</label>
                        <textarea id='Objective' placeholder='Please mention the reason for meeting....' value={objective} onChange={(e)=>setObjective(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' name='date' value={date} onChange={(e)=>setDate(e.target.value)} />
                    </div>
                    <div>
                        <button type='Submit' disabled={appointmentLoading}>{appointmentLoading ? 'Creating...' : 'Create Appointment'}</button>
                    </div>
                </form>
        </div>)}
    </div>
  )
}

export default Appointments