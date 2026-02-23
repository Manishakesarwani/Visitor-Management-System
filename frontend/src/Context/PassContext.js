import { createContext, useReducer } from "react";


export const PassContext = createContext();

export const PassReducer = (state, action) => {
    switch (action.type){
        case "GETPASSES":
            return {
                passes: action.payload
            }
        case "CREATEPASS":
            return {
                passes: [action.payload, ...(state.passes || [])]
            }
        default:
            return state
    }
}

export const PassContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(PassReducer, {
        passes: []
    })

    return (
        <PassContext.Provider value={{...state, dispatch}}>
            {children}
        </PassContext.Provider>
    )
}