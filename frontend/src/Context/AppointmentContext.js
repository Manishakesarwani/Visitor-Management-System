import { createContext, useReducer } from "react";


export const AppointmentContext = createContext();

export const AppointmentReducer = (state, action) => {
    switch(action.type){
        case "GET":
            return{
                appointments: action.payload
            }
        case "SET":
            return{
                appointments: [action.payload, ...(state.appointments || [])]
            }
        case "UPDATE":
            return{
                ...state,
                appointments: state.appointments.map((a)=> (a._id === action.payload._id) ? {...a, Status: action.payload.Status}: a)
            }
        default:
            return state;
    }
}

export const AppointmentContextProvider = ({children}) => {


    const [state, dispatch] = useReducer(AppointmentReducer, {
        appointments: []
    });


    return (
        <AppointmentContext.Provider value={{...state, dispatch}}>
            {children}
        </AppointmentContext.Provider>
    )
}