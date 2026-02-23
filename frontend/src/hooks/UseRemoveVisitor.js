import { useState } from "react";
import { UseVisitorContext } from "./UseVisitorContext"
import { UseAuthorizationContext } from "./UseAuthorizationContext";


export const UseRemoveVisitor = () => {
    const {visitors, dispatch} = UseVisitorContext();
    const {user} = UseAuthorizationContext();
    const [isRemoving, setIsRemoving] = useState(false);
    const [removeError, setRemoveError] = useState("");
    
    const removeVis = async(id) => {
        setIsRemoving(true);
        setRemoveError("");

        const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/visitors/remove/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type":"application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setIsRemoving(false);
            setRemoveError(json.error);

            return false;
        }
        if(response.ok){
            setIsRemoving(false);
            setRemoveError("");

            dispatch({type: "DELETE", payload: json});

            return true;
        }
    }
    return {isRemoving, removeError, visitors, removeVis}
}