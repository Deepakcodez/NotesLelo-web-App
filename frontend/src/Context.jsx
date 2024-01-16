import { createContext, useState } from "react";
export const createGroupContext = createContext()
export const Context = ({children}) => {

    const [isCreateGroup, setCreateGroup] = useState(false)
    const [joinGroup, setJoinGroup] = useState(false)
    const [groupDeleteOpt , setGroupDeleteOpt]  = useState(false)
    const [clickedGroupId , setClicikedGroupId] = useState('')
    const [currentUser , setCurrentUser] = useState({})
    const [demand,setDemand] = useState(false)

  return (
<>
<createGroupContext.Provider  value={{isCreateGroup,setCreateGroup,demand,setDemand,joinGroup,setJoinGroup,clickedGroupId,setClicikedGroupId,groupDeleteOpt,setGroupDeleteOpt ,currentUser , setCurrentUser}} >
{children}
</createGroupContext.Provider>
</>
  )
}
