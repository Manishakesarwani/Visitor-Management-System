import { useState } from "react";
import { UseAuthorizationContext } from "./UseAuthorizationContext";


export const UseGetUsersViaAdmin = () => {

    const {user} = UseAuthorizationContext();   
    const [visError, setVisError] = useState("");
    const [iseUsersLoading, setIsUsersLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const getAllUsers = async() => {
        setVisError("");
        setIsUsersLoading(true);
            const response = await fetch(`${process.env.REACT_APP_RENDER_URL}/api/admin/get`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
        
            const json = await response.json();
            if(!response.ok){
                setVisError(json.error);
                setIsUsersLoading(false);

                return false;
            }
            if(response.ok){
                setVisError("");
                setIsUsersLoading(false);
                setUsers(json); 
                
                return true;
            }

        }

        return {users, visError, iseUsersLoading, getAllUsers}
}