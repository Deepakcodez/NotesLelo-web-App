import { createContext, useState } from "react";
export const createGroupContext = createContext()
export const Context = ({children}) => {

    const [isCreateGroup, setCreateGroup] = useState(false)

  return (
<>
<createGroupContext.Provider  value={{isCreateGroup,setCreateGroup}} >
{children}
</createGroupContext.Provider>
</>
  )
}
