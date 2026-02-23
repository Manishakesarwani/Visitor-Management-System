import { UseAuthorizationContext } from "./UseAuthorizationContext"
import { UseAppointmentContext } from "./UseAppointmentContext";
import { useState } from "react";


export const UseGetAppointments = () => {
    const {user} = UseAuthorizationContext();
    const {appointments, dispatch} = UseAppointmentContext();
    const [appError, setAppError] = useState("");
    const [isEligibleToCreate, setIsEligibleToCreate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const getAllAppointments = async () => {

        let link = `${process.env.RENDER_URL}/api/appointments`;

        setIsLoading(true);

        setAppError("");

        if(user.Role==="employee"){
            setIsEligibleToCreate(true);
            link = `${process.env.RENDER_URL}/api/appointments/employee`;
        }
        else{
            setIsEligibleToCreate(false);
        }

        const response = await fetch(link, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();
        if(!response.ok){
            setAppError(json.error);
            setIsLoading(false);

            return false;
        }
        if(response.ok){
            setAppError("");
            setIsLoading(false);
            dispatch({type:"GET", payload: json});  
            
            return true;
        }

        

    }
    return {isLoading, appointments, appError, isEligibleToCreate, getAllAppointments}
}