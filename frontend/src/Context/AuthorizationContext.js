const { createContext, useEffect, useReducer } = require("react");

export const AuthorizationContext = createContext();

export const AuthorizationReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return{
                user: action.payload
            }
        case "LOGOUT":
            return{
                user: null
            }
        default:
            return state
    }
}

export const AuthorizationContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthorizationReducer, {
        user: null
    });

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));

        if(user){
            dispatch({type: "LOGIN", payload: user});
        }
    }, []);

    console.log("Authorization State: ", state);

    return (
        <AuthorizationContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthorizationContext.Provider>
    )
}