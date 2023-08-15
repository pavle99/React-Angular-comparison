import React from "react";

import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Login from "./pages/Login";
import Notes from "./pages/Notes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<Login />} />,
      <Route path="/notes" element={<Notes />} />
    </React.Fragment>
  )
);
