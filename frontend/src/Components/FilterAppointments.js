import React, { useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import { UseAppointmentContext } from '../hooks/UseAppointmentContext';

const FilterAppointments = () => {

    const [appStatus, setAppStatus] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [error, setError] = useState("");

    const {user} = UseAuthorizationContext();
    const {dispatch} = UseAppointmentContext();

    const handleAddFilter = async() => {

        setError("");

        let link;

        if(user.Role==="employee"){
            if(appStatus && fromDate && toDate){
                link = `http://localhost:5000/api/appointments/filter?Status=${appStatus}&From=${fromDate}&To=${toDate}&id=${user.Role}`;
            }
            else if(appStatus){
                link = `http://localhost:5000/api/appointments/filter?Status=${appStatus}&id=${user.Role}`;
            }
            else if(fromDate && toDate){
                link = `http://localhost:5000/api/appointments/filter?From=${fromDate}&To=${toDate}&id=${user.Role}`;
            }
            else{
                link = `http://localhost:5000/api/appointments/employee`;
            }
        }
        else{
            if(appStatus && fromDate && toDate){
                link = `http://localhost:5000/api/appointments/filter?Status=${appStatus}&From=${fromDate}&To=${toDate}`;
            }
            else if(appStatus){
                link = `http://localhost:5000/api/appointments/filter?Status=${appStatus}`;
            }
            else if(fromDate && toDate){
                link = `http://localhost:5000/api/appointments/filter?From=${fromDate}&To=${toDate}`;
            }
            else{
                link = "http://localhost:5000/api/appointments";
            }
        }

        const response = await fetch(link, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            dispatch({type: "GET", payload: json});
        }

    }

    const handleResetFilter = async () => {

        setAppStatus("");
        setFromDate("");
        setToDate("");
        setError("");

        let link;

        if(user.Role==="employee"){
            link = `http://localhost:5000/api/appointments/employee`;
        }
        else{
            link = "http://localhost:5000/api/appointments";
        }

        const response = await fetch(link, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            dispatch({type: "GET", payload: json});
        }
        
    }

  return (
    <div className='filter'>
        {error && (<div className='error'>{error}</div>)}
        <select value={appStatus} onChange={(e)=>setAppStatus(e.target.value)}>
            <option value="">All</option>
            <option value="approve">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
        </select>
        From: <input type='date' onChange={(e)=>setFromDate(e.target.value)} value={fromDate} />
        To: <input type='date' onChange={(e)=>setToDate(e.target.value)} value={toDate} />
        <button type='button' onClick={handleAddFilter}>Apply</button>
        <button type='button'onClick={handleResetFilter}>Reset</button>
    </div>
  )
}

export default FilterAppointments