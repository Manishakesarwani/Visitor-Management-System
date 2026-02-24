import { useState } from "react"
import { UseAuthorizationContext } from "./UseAuthorizationContext";


export const UseAddUsersViaAdmin = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {user} = UseAuthorizationContext();

    const signup = async (Name, Username, Password, Role) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/admin/signup`, {
            method: "POST",
            body: JSON.stringify({Name, Username, Password, Role}),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
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

            // localStorage.setItem("user", JSON.stringify(json));

            //Saving User to the global Authorization Context.

            // dispatch({type: "LOGIN", payload: json});
            return true;
        }
    }

    return {signup, error, isLoading}
}