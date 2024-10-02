
import React from "react";
import Home from "@/Components/Home";
import { YourNotesPage } from "@/pages/users/YourNotes";
import { NotificationPage } from "@/pages/users/Notification";
import { Savedpage } from "@/pages/users/Saved";
import { ProfilePage } from "@/pages/users/Profile";
import { LibraryPage } from "@/pages/users/Library";
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
    
  ];

  const USER_GROUP_ROUTES: RoutDocument[] = [
    
    {
      href: "demand",
      page: GroupDemand,
    },
    {
      href: "notes",
      page: Notes,
    },
    
  
  ]

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
    USER_GROUP_ROUTES,
  }
  