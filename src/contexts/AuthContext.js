import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initState = {
    user: JSON.parse(localStorage.getItem("user")) || null
}

const SET_LOG_IN = "log_in";
const SET_LOG_OUT = "log_out";

// Actions
const setLogin = (payload) => ({
    type: SET_LOG_IN,
    payload
});

const setLogout = (payload) => ({
    type: SET_LOG_OUT,
    payload
})

const authReducer = (state, action) => {
    switch (action.type) {
        case SET_LOG_IN:
            return {
                user: action.payload
            };
        case SET_LOG_OUT:
            return {
                user: null
            };
        default:
            return state;
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            dispatch(setLogin(user));
        }
    },[])

    // console.log("AuthContext state: ", state)

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, authReducer, AuthContextProvider, setLogin, setLogout };

