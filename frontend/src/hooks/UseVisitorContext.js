import { useContext } from "react"
import { VisitorContext } from "../Context/VisitorContext"

export const UseVisitorContext = () => {
    const Vis_Context = useContext(VisitorContext);

    if(!Vis_Context){
        throw Error("UseVisitorContext must be under VisitorContextProvider.");
    }

    return Vis_Context;
}