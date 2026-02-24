import { useState } from "react"
import { UseAuthorizationContext } from "./UseAuthorizationContext";
import { UseVisitorContext } from "./UseVisitorContext";


export const UseAddVisitor = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {user} = UseAuthorizationContext();
    const {visitors, dispatch} = UseVisitorContext();

    const visitorAppointment = async (Name, Username, PhoneNumber, Photo) => {

        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        const VisitorData = new FormData();

        VisitorData.append("Name", Name);
        VisitorData.append("Username", Username);
        VisitorData.append("PhoneNumber", PhoneNumber);
        VisitorData.append("Photo", Photo);

        
        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/visitors`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
            body: VisitorData
        });

        const json = await response.json();


        if(!response.ok){
            setError(json.error);
            setIsLoading(false);
            setIsSuccess(false);

            return false;
        }
        if(response.ok){
            setIsLoading(false);
            setError(null);
            setIsSuccess(true);

            dispatch({type: "ADD", payload: json});

            return true;
        }

    }
    return {error, isLoading, visitors, visitorAppointment, isSuccess}
}
