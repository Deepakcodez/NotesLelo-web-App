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
    const [homeLoading, setHomeLoading] = useState(true)
    const [showInviteForm, setInviteForm] = useState(false)
    const [showLeftGroup, setShowLeftGroup] = useState(false)
    const [showGroupMembers, setGroupMembers] = useState(false)

  return (
<>
<createGroupContext.Provider  value={{ showInviteForm,showLeftGroup,showGroupMembers, setGroupMembers, setShowLeftGroup, setInviteForm , isCreateGroup ,homeLoading, setHomeLoading, setCreateGroup,isUploadPage,setUploadPage,demand,setDemand,joinGroup,setJoinGroup,clickedGroupId,setClicikedGroupId,groupDeleteOpt,setGroupDeleteOpt ,currentUser , setCurrentUser}} >
{children}
</createGroupContext.Provider>
</>
  )
}
