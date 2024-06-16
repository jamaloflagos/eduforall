import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw Error("Must be used within its context");
    }

    return context;
}