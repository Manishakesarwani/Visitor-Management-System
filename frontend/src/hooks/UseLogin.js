import { useState } from 'react';
import {UseAuthorizationContext} from './UseAuthorizationContext';

export const UseLogin = () => {

    const {dispatch} = UseAuthorizationContext();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async(Username, Password) => {
        setIsLoading(true);
        setError(null);

        const response = await  fetch(`${process.env.REACT_APP_RENDER_URL}/api/user/login`, {
            method: "POST",
            body: JSON.stringify({Username, Password}),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok){
            setIsLoading(false);

            //Saving user to the browser's local storage

            localStorage.setItem("user", JSON.stringify(json));

            //Saving user in the global authorization Context
            dispatch({type: "LOGIN", payload: json});
        }
    }

    return {login, error, isLoading}

}