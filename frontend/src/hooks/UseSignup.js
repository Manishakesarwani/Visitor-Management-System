import { useState } from "react"
import { UseAuthorizationContext } from "./UseAuthorizationContext";


export const UseSignup = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {dispatch} = UseAuthorizationContext();

    const signup = async (Name, Username, Password, Role) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5000/api/user/signup", {
            method: "POST",
            body: JSON.stringify({Name, Username, Password, Role}),
            headers: {
                "Content-type": "application/json"
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok){
            setIsLoading(false);
            setError(null);

            //Saving User to the local storage.

            localStorage.setItem("user", JSON.stringify(json));

            //Saving User to the global Authorization Context.

            dispatch({type: "LOGIN", payload: json});
        }
    }

    return {signup, error, isLoading}
}