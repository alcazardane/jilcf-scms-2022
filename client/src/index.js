import React from "react";
import ReactDOM from "react-dom/client";
import {Loginfunc, Home, CreateUser, App} from "./App";

import './index.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    
      <Routes>
        <Route path="/" element={ <App /> }>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Loginfunc />} />
          <Route path="/create" element={<CreateUser />} />
        </Route>
      </Routes>

    </Router>
);