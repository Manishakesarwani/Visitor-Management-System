import { useContext } from "react"
import { CheckInOutContext } from "../Context/CheckInOutContext"


export const UseCheckInOutContext = () => {
    const check_context = useContext(CheckInOutContext);

    if(!check_context){
        throw Error("UseCheckInOutContext should come under UseCheckInOutContextProvider");
    }

    return check_context;
}