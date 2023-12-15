import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export default function UserProvider({children}){
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user,setUser] = useState(lsUser?lsUser:{})
    const navigate = useNavigate()

    useEffect(()=>{
        if(lsUser==null&&window.location.pathname!="/"&&window.location.pathname!="/cadastro") return navigate("/")
        axios.post(`${import.meta.env.VITE_API_URL}/token`,{email:user.email,token:user.token})
        .then(()=>{navigate("/home")})
        .catch(()=>{if(window.location.pathname!="/"&&window.location.pathname!="/cadastro") navigate("/")})
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}