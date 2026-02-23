import { useContext } from "react"
import { PassContext } from "../Context/PassContext"


export const UsePassContext = () => {
    const pass_context = useContext(PassContext);

    if(!pass_context){
        throw Error("UsePassContext should come under PassContextProvider");
    }

    return pass_context;
}