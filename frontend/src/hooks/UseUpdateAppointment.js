import { useState } from "react";
import { UseAppointmentContext } from "./UseAppointmentContext";
import { UseAuthorizationContext } from "./UseAuthorizationContext"


export const UseUpdateAppointment = () => {

    const {user} = UseAuthorizationContext();
    const {appointments, dispatch} = UseAppointmentContext();

    const [updateStatus, setUpdateStatus] = useState(false);

    const updateAppointment = async (id, Status) => {

        setUpdateStatus(true);
        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/appointments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({Status})
        });

        const json = await response.json();
        if(!response.ok){
            setUpdateStatus(false);

            return false;
        }
        if(response.ok){
            setUpdateStatus(false);
            dispatch({type: "UPDATE", payload: json});

            return true;
        }
    }

    return {updateStatus, appointments, updateAppointment}
}