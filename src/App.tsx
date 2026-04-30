import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Module1 from './components/Module1/Module1';
import { Module } from './types';
import './App.css';

function App() {
  const [modules, setModules] = useState<Module[]>([]);

  const handleUpdateModule = (updatedModule: Module) => {
    setModules(
      modules.map((m) => (m.id === updatedModule.id ? updatedModule : m))
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/module/1" element={<Module1 />} />
      </Routes>
    </Router>
  );
}

export default App;
