import { useEffect, useState } from "react"
import { UseAuthorizationContext } from "../hooks/UseAuthorizationContext";
import { UseCheckInOut } from "../hooks/UseCheckInOut";

export const CheckPass = ({p_id}) => {

    const [isEligible, setIsEligible] = useState(false);
    const [isEligibleChk, setIsEligibleChk] = useState(false);
    
    const {user} = UseAuthorizationContext();
    const {error, isLoading, isCheckedOut, checklogs, getLogs, checkPassId} = UseCheckInOut();

    const handleScan = async(e) => {

        // e.preventDefault();

        await checkPassId(p_id);

        // if(success){
        //     getLogs();
        // }
    }

    useEffect(()=>{
        // setPassId(p_id);

        if(user){
            getLogs();
        }

        if(user.Role === "security"){
            setIsEligibleChk(true);
        }
        else{
            setIsEligibleChk(false);
        }

        if(user.Role === "security" || user.Role=== "admin"){
            setIsEligible(true);
        }
        else{
            setIsEligible(false);
        }

        // console.log("checklogs", checklogs);
    }, [user]);

    const logs = checklogs.find((c)=>c.PassID?.toString() === p_id?.toString())

    return (
        <div>
            {isEligible && (
                <div className='check-buttons'>
                    {error && (
                        <div className="error">{error}</div>
                    )}
                    {isEligibleChk && !isCheckedOut && !logs?.CheckOutTime && (
                        <button type='button' onClick={handleScan} disabled={isLoading}>{isLoading ? "Scanning..." : "Scan"}</button>
                    )}
                    {(
                    <div>
                        <strong>CheckIn Status</strong>: {
                        !logs ? "Pending" : logs.CheckInTime && !logs.CheckOutTime ? "Checked-In" : logs.CheckInTime && logs.CheckOutTime ? "Checked-Out" : "Pending"
                    }
                    </div>
                    )}
                    
                    
                </div>
            )}
           
        </div>
    )

}
