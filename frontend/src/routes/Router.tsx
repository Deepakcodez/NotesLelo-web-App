
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "@/Components/PageNotFound";
import { USER_AUTH_ROUTES, USER_GROUP_ROUTES, USER_ROUTES } from "./constant";
import { AuthUserLayout, RootUserLayout } from "@/layouts";
import { GroupLayout } from "@/pages/users/Group";
import { SocketProvider } from "@/utils/socketProvider";



const Router: React.FC = () => {
  return (
    <SocketProvider>

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
          <Route path="/group" element={React.createElement(GroupLayout)}>
            {USER_GROUP_ROUTES.map((route, i) => (
              <Route
                key={`USER_GROUP_ROUTE_${i}`}
                path={route.href}
                element={React.createElement(route.page)}
              />
            ))}
          </Route>
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
    </SocketProvider>

  );
};

export default Router;
