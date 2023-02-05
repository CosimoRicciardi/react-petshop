import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App-router";
import { Header } from "./modules/layout/header";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="header">
          <Header />
        </div>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
