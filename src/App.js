import './App.css';
import * as React from "react";
//import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

//import layouts
import RootLayout from './Layouts/Rootlayout';

//import pages
import { Auth } from './Authentication/Auth';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Path = "/" element = {<RootLayout />}>
      <Route index element = { <Auth /> } />
      <Route path="Register" element = { <Register /> } />
      <Route path="Dashboard" element = { <Dashboard /> } />
     
      <Route path="*" element ={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
     (<RouterProvider router = {router} />)
  );
}

export default App;
