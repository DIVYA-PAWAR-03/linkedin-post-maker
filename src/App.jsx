import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
