import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducers";

const initialState = {
    user: localStorage.getItem("pern_blog_auth"),
    isFetching: false,
    error: false
};

export const Context = createContext(initialState);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        localStorage.setItem("pern_blog_auth", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch}}>
            {children}
        </Context.Provider>
    );
};