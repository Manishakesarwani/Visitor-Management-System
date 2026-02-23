import { useState } from "react";
import { UseAuthorizationContext } from "./UseAuthorizationContext";
import { UseVisitorContext } from "./UseVisitorContext";


export const UseGetVisitors = () => {
    const [isEligible, setIsEligible] = useState(false);
    const {user} = UseAuthorizationContext();
    const {visitors, dispatch} = UseVisitorContext();
    const [visError, setVisError] = useState("");

    const getAllVisitor = async() => {
        setVisError("");
            const response = await fetch(`${process.env.RENDER_URL}/api/visitors`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
        
            const json = await response.json();
            if(!response.ok){
                setVisError(json.error);
            }
            if(response.ok){
                // console.log(json);
                // console.log(json);
                setVisError("");
                dispatch({type: "GET", payload: json});
                // console.log(visitors);
            }

            if(user.Role==="admin" || user.Role==="security"){
                setIsEligible(true);
            }
            else{
                setIsEligible(false);
            }
        }

        return {visitors, isEligible, visError, getAllVisitor}
}