import React from "react";
 
// We use Route in order to define the different routes of our application
import { Outlet } from 'react-router-dom';

// We import all the components we need in our app
// import RecordList from "./components/recordList";
// import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login/login";
import MainWindow from "./components/main_window/main_window";

export function Loginfunc(){
  return(
    <Login />
  )
}

export function Home(){
  return(
    <MainWindow />
  )
}

export function CreateUser(){
  return(
    <Create />
  )
}

export function App(){
  return (
    <Outlet />
  );
};