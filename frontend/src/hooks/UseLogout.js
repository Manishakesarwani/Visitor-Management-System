import { UseAuthorizationContext } from "./UseAuthorizationContext"


export const UseLogout = () =>{
    const {dispatch} = UseAuthorizationContext();

    const logout = () => {
        //Remove user from local storage.

        localStorage.removeItem("user");

        //Removing user from global Authorization Context.

        dispatch({type: "LOGOUT"});
    }
    return {logout}
}