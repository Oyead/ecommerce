import { createContext, useState } from "react";


export const numItem = createContext(0)

export default  function NumItemContextProvider({children})
{
    let [cartNum,setCartNums] = useState(0)
    return <numItem.Provider value={{cartNum,setCartNums}}>
       {children}
    </numItem.Provider>
}