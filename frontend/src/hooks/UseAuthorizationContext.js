import { useContext } from "react";
import { AuthorizationContext } from "../Context/AuthorizationContext";

export const UseAuthorizationContext = () => {
    const context = useContext(AuthorizationContext);

    if(!context){
        throw Error("UseAuthorizationContext must be under AuthorizationContextProvider.");
    }
    return context;
}