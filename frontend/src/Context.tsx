import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface CreateGroupContextType {
  isCreateGroup: boolean;
  setCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
  joinGroup: boolean;
  setJoinGroup: React.Dispatch<React.SetStateAction<boolean>>;
  groupDeleteOpt: boolean;
  setGroupDeleteOpt: React.Dispatch<React.SetStateAction<boolean>>;
  clickedGroupId: string;
  setClicikedGroupId: React.Dispatch<React.SetStateAction<string>>;
  currentUser: any; // Adjust this type according to your user object structure
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  demand: boolean;
  setDemand: React.Dispatch<React.SetStateAction<boolean>>;
  isUploadPage: boolean;
  setUploadPage: React.Dispatch<React.SetStateAction<boolean>>;
  homeLoading: boolean;
  setHomeLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showInviteForm: boolean;
  setInviteForm: React.Dispatch<React.SetStateAction<boolean>>;
  showLeftGroup: boolean;
  setShowLeftGroup: React.Dispatch<React.SetStateAction<boolean>>;
  showGroupMembers: boolean;
  setGroupMembers: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDeleteDemand: boolean;
  setIsShowDeleteDemand: React.Dispatch<React.SetStateAction<boolean>>;
  demandId: string;
  setDemandId: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with undefined as default
export const createGroupContext = createContext<CreateGroupContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const Context: React.FC<Props> = ({ children }) => {
  const [isCreateGroup, setCreateGroup] = useState<boolean>(false);
  const [joinGroup, setJoinGroup] = useState<boolean>(false);
  const [groupDeleteOpt, setGroupDeleteOpt] = useState<boolean>(false);
  const [clickedGroupId, setClicikedGroupId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>({});
  const [demand, setDemand] = useState<boolean>(false);
  const [isUploadPage, setUploadPage] = useState<boolean>(false);
  const [homeLoading, setHomeLoading] = useState<boolean>(true);
  const [showInviteForm, setInviteForm] = useState<boolean>(false);
  const [showLeftGroup, setShowLeftGroup] = useState<boolean>(false);
  const [showGroupMembers, setGroupMembers] = useState<boolean>(false);
  const [isShowDeleteDemand, setIsShowDeleteDemand] = useState<boolean>(false);
  const[demandId, setDemandId] = useState<string>("")

  return (
    <createGroupContext.Provider
      value={{
        isCreateGroup,
        setCreateGroup,
        joinGroup,
        setJoinGroup,
        groupDeleteOpt,
        setGroupDeleteOpt,
        clickedGroupId,
        setClicikedGroupId,
        currentUser,
        setCurrentUser,
        demand,
        setDemand,
        isUploadPage,
        setUploadPage,
        homeLoading,
        setHomeLoading,
        showInviteForm,
        setInviteForm,
        showLeftGroup,
        setShowLeftGroup,
        showGroupMembers,
        setGroupMembers,
        isShowDeleteDemand,
        setIsShowDeleteDemand,
        demandId,
        setDemandId,

      }}
    >
      {children}
    </createGroupContext.Provider>
  );
};
