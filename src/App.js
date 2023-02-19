import React from "react";
import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import NavBar from "./components/NavBar";
import PageTitle from "./components/PageTitle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/GlobalStyles.css";

function App() {
  return (
    <>
      <NavBar />
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1.4rem" } }}
      />
      <div className="container">
        <PageTitle>TODO List</PageTitle>
        <div className="app__wrapper">
          <AppHeader />
          <AppContent></AppContent>
        </div>
      </div>
    </>
  );
}

export default App;
