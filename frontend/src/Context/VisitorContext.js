import { createContext, useReducer } from "react";


export const VisitorContext = createContext();

const VisitorReducer = (state, action) => {
    switch(action.type){
        case "ADD":
            return{
                visitors: [action.payload, ...(state.visitors || [])]
            }
        case "GET":
            return{
                visitors: action.payload
            }
        case "DELETE":
            const newVis = state.visitors.filter((v) => v._id !== action.payload._id);
            return{
                visitors: newVis
            }
        default:
            return state
    }
}

export const VisitorContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(VisitorReducer, {
        visitors: []
    });

    return (
        <VisitorContext.Provider value={{...state, dispatch}}>
            {children}
        </VisitorContext.Provider>
    )
}