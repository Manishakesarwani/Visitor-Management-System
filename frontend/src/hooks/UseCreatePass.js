import { useState } from "react"
import { UseAuthorizationContext } from "./UseAuthorizationContext";
import { UsePassContext } from "./UsePassContext";


export const UseCreatePass = () => {
    const [isError, setIsError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {user} = UseAuthorizationContext();
    const {dispatch} = UsePassContext();

    const createPass = async(AppointmentId) => {
        setIsLoading(true);
        setIsError("");
        setIsSuccess(false);

        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/pass`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({AppointmentId})
        });

        const json =await  response.json();

        if(!response.ok){
            setIsLoading(false);
            setIsError(json.error);
            setIsSuccess(false);

            return false;
        }
        if(response.ok){
            setIsLoading(false);
            setIsError(null);
            setIsSuccess(true);

            dispatch({type: "CREATEPASS", payload: json});

            return true;
        }
    }
    return {isError, isLoading, isSuccess, createPass}
}