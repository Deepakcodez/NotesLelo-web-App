import { createContext, useState } from "react";
export const createGroupContext = createContext()
export const Context = ({children}) => {

    const [isCreateGroup, setCreateGroup] = useState(false)
    const [joinGroup, setJoinGroup] = useState(false)
    const [groupDeleteOpt , setGroupDeleteOpt]  = useState(false)
    const [clickedGroupId , setClicikedGroupId] = useState('')
    const [currentUser , setCurrentUser] = useState({})
    const [demand,setDemand] = useState(false)
    const [isUploadPage,setUploadPage] = useState(false)

  return (
<>
<createGroupContext.Provider  value={{isCreateGroup,setCreateGroup,isUploadPage,setUploadPage,demand,setDemand,joinGroup,setJoinGroup,clickedGroupId,setClicikedGroupId,groupDeleteOpt,setGroupDeleteOpt ,currentUser , setCurrentUser}} >
{children}
</createGroupContext.Provider>
</>
  )
}
