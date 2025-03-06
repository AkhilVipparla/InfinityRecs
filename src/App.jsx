import React from "react";

import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Dash from "./Dash";
import Home from "./Home";

const router =createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route index element = {<Home/>}/>
    <Route path="/Dash" element={<Dash/>}/>
    
    </>
  )
)

const App = () => {
  return (
    <>
    <RouterProvider router ={router}/>
    </>
  );
};

export default App;
