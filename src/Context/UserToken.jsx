import { createContext, useEffect, useState } from "react";




export let userToken = createContext(null)
export default function UserTokenProvider({ children }) {
    let [isLogin, setLogin] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem('token'))
            setLogin(localStorage.getItem('token'))
    },[])


   
    return <userToken.Provider value={{ isLogin, setLogin }}>

        {children}
    </userToken.Provider>
}
