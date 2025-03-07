import React from "react";
import Navbar from "./Components/navar.jsx/Navbar";
import Hero from "./Components/Hero.jsx/Hero";
import CategoryGrid from "./Components/CategoryGrid.jsx/CategoryGrid";
import MusicPage from "./Pages/MusicPage";
import { Routes, Route } from "react-router-dom";  

const Dash = () => {
  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 dark:from-darkyy dark:to-purple-300">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Hero />} />
        
        
      </Routes>
      <CategoryGrid/>
    </div>
  );
};

export default Dash;
