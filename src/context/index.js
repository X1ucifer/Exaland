import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter, userRouter } from "next/router";

// initial state
const intialState = {
    image: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, image: action.payload };
        case "LOGOUT":
            return { ...state, image: null };
        default:
            return state;
    }
};

// context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, intialState);

    // router
    const router = useRouter();

    // useEffect(() => {
    //     dispatch({
    //         type: "LOGIN",
    //         payload: JSON.parse(window.localStorage.getItem("user")),
    //     });
    // }, []);










    return (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
};

export { Context, Provider };
