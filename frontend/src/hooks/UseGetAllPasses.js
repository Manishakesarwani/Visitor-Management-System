import { useState } from "react"
import { UseAuthorizationContext } from "./UseAuthorizationContext";
import {UsePassContext} from "./UsePassContext";


export const UseGetAllPasses = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {user} = UseAuthorizationContext();

    const {dispatch} = UsePassContext();

    const getPasses = async () => {

        setIsLoading(true);

        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/pass`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        console.log(json);

        if(!response.ok){
            setIsLoading(false);
        }
        if(response.ok){
            setIsLoading(false);
            // console.log("json",json);
            dispatch({type: "GETPASSES", payload: json});

            // console.log("getpass", passes);
        }
    }

    return {isLoading, getPasses}
}