
import React from "react";
import {  Route, Routes } from "react-router-dom";
import PageNotFound from "@/Components/PageNotFound";
import { USER_AUTH_ROUTES, USER_ROUTES } from "./constant";
import { AuthUserLayout, RootUserLayout } from "@/layouts";



const Router: React.FC = () => {
  return (
  
      <Routes>
        <Route path="*" element={React.createElement(PageNotFound)} />
        <Route path="/" element={React.createElement(RootUserLayout)}>
          {USER_ROUTES.map((route, i) => (
            <Route
              key={`USER_ROUTE_${i}`}
              path={route.href}
              element={React.createElement(route.page)}
            />
          ))}
        </Route>
        <Route path="/" element={React.createElement(AuthUserLayout)}>
          {USER_AUTH_ROUTES.map((route, i) => (
            <Route
              key={`USER_AUTH_ROUTE_${i}`}
              path={route.href}
              element={React.createElement(route.page)}
            />
          ))}
        </Route>
      </Routes>
  );
};

export default Router;
