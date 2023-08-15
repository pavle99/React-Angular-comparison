import { RouterProvider } from "react-router-dom";
import { router } from "./siteRoutes";
import React from "react";
import { UserProvider } from "./siteContext";

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
