import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        
    });
    const [ chatId,setChatId] = useState(undefined);
    const [chatOpen,setChatOpen] = useState(false);
    const [currentMsg,setCurrentMsg] = useState("")
        
    

    

    return (
        <AuthContext.Provider value={{auth,setAuth,chatId,setChatId,chatOpen,setChatOpen,currentMsg,setCurrentMsg}}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth =()=> {
    return useContext(AuthContext);
}

export { AuthProvider };
