import { useState } from "react"
import { UseAuthorizationContext } from "./UseAuthorizationContext"
import { UseCheckInOutContext } from "./UseCheckInOutContext";


export const UseCheckInOut = () =>{

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckedOut, setIsCheckedOut] = useState(false);

    const {user} = UseAuthorizationContext();
    const {checklogs, dispatch} = UseCheckInOutContext();

    const getLogs = async() => {
        const response = await fetch(`${process.env.RENDER_URL}/api/checkpass`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();
        if(response.ok){
            dispatch({type: "GET", payload: json});
        }
    }

    const checkPassId = async(passId) => {
        setError("");
        setIsLoading(true);
        setIsCheckedOut(false);

        const response = await fetch(`${process.env.RENDER_URL}/api/checkpass/${passId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json=await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
            setIsCheckedOut(false);
        }
        if(response.ok){
            setIsLoading(false);
            setError("");

            const log = json.checkLog ? json.checkLog : json;

            console.log(log);

           dispatch({type: "SCAN", payload: log});
           if(log.CheckOutTime){
            setIsCheckedOut(true);
           }
        }
    }
    return {error, isLoading, isCheckedOut, checklogs, getLogs, checkPassId}
}