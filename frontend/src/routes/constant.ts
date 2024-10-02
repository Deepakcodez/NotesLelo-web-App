
import React from "react";
import Home from "@/Components/Home";
import { YourNotesPage } from "@/pages/users/YourNotes";
import { NotificationPage } from "@/pages/users/Notification";
import { Savedpage } from "@/pages/users/Saved";
import { ProfilePage } from "@/pages/users/Profile";
import { LibraryPage } from "@/pages/users/Library";
import { GroupLayout } from "@/pages/users/Group";
import  { GroupDemand } from "@/pages/users/Group";
import { Notes } from '@/pages/users/Group';
import { SignIn, SignUp } from "@/pages/users/auth";


interface RoutDocument{
    href : string;
    page  : React.FC;
}

const USER_ROUTES: RoutDocument[] = [
    {
      href: "",
      page: Home,
    },
    {
      href: "yourNotes",
      page:  YourNotesPage ,
    },
    {
      href: "notifications",
      page: NotificationPage,
    },
    {
      href: "savedNotes",
      page: Savedpage,
    },
    {
      href: "profile",
      page: ProfilePage,
    },
    {
      href: "library",
      page: LibraryPage,
    },
    {
      href: "group",
      page: GroupLayout,
    },
    {
      href: "group/demand",
      page: GroupDemand,
    },
    {
      href: "group/notes",
      page: Notes,
    },
    
  
  ];

  const USER_AUTH_ROUTES: RoutDocument[] = [
    {
      href: "signIn",
      page: SignIn ,
    },
    {
      href: "signUp",
      page:  SignUp ,
    },
  ]


  export {
    USER_ROUTES,
    USER_AUTH_ROUTES,
  }
  