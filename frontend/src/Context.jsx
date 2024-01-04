import { createContext, useState } from "react";
export const createGroupContext = createContext()
export const Context = ({children}) => {

    const [isCreateGroup, setCreateGroup] = useState(false)
    const [joinGroup, setJoinGroup] = useState(false)
    const [groupDeleteOpt , setGroupDeleteOpt]  = useState(false)
    const [clickedGroupId , setClicikedGroupId] = useState('')

  return (
<>
<createGroupContext.Provider  value={{isCreateGroup,setCreateGroup,joinGroup,setJoinGroup,clickedGroupId,setClicikedGroupId,groupDeleteOpt,setGroupDeleteOpt}} >
{children}
</createGroupContext.Provider>
</>
  )
}
