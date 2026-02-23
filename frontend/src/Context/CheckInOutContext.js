import { createContext, useReducer } from "react";


export const CheckInOutContext = createContext();

const CheckInOutReducer = (state, action) => {
    switch(action.type) {
        case "SCAN":
            const exists = state.checklogs.find((c)=> c._id === action.payload._id);
            if(exists){
                return {
                    checklogs: state.checklogs.map((chk)=> chk._id === action.payload._id ? action.payload : chk)
                } 
            }
            else{
                return{
                    checklogs: [action.payload, ...state.checklogs]
                }
            }
        case "GET":
            return {
                checklogs: action.payload
            }
        default:
            return state
    }
}

export const CheckInOutContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CheckInOutReducer, {
        checklogs: []
    })
    return (
        <CheckInOutContext.Provider value={{...state, dispatch}}>
            {children}
        </CheckInOutContext.Provider>
    )
}