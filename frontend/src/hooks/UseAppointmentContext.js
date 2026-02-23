import { useContext } from "react"
import { AppointmentContext } from "../Context/AppointmentContext"


export const UseAppointmentContext = () => {
    const appointment_context = useContext(AppointmentContext);

    if(!appointment_context){
        throw Error("UseAppointmentContext should be used under AppointmentContextProvider.");
    }

    return appointment_context;
}