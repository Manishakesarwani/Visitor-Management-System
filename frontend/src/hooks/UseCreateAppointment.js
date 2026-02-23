import { useState } from "react"
import { UseAppointmentContext } from "./UseAppointmentContext";
import { UseAuthorizationContext } from "./UseAuthorizationContext";


export const UseCreateAppointment = () => {
    const [appointmentLoading, setAppointmentLoading] = useState(false);
    const [appointmentError, setAppointmentError] = useState("");
    const [appointmentSuccess, setAppointmentSuccess] = useState(false);
    const {dispatch} = UseAppointmentContext();
    const {user} = UseAuthorizationContext();

    const setAppointment = async (VisitorId, Objective, When) => {
        setAppointmentLoading(true);
        setAppointmentError("");
        setAppointmentSuccess(false);

        const response = await fetch(`${process.env.RENDER_URL}/api/appointments`, {
            method: "POST",
            body: JSON.stringify({VisitorId, Objective, When}),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setAppointmentLoading(false);
            setAppointmentError(json.error);
            setAppointmentSuccess(false);

            return false;
        }
        if(response.ok){
            setAppointmentSuccess(true);
            setAppointmentError("");
            setAppointmentLoading(false);

            dispatch({type: "SET", payload: json});

            return true;
        }

    }

    return {appointmentLoading, appointmentError, appointmentSuccess, setAppointment}
}