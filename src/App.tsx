import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ModuleOverview from './components/ModuleOverview';
import { Module } from './types';
import { sampleModules } from './data';
import './App.css';

function App() {
  const [modules, setModules] = useState<Module[]>(sampleModules);

  const handleUpdateModule = (updatedModule: Module) => {
    setModules(
      modules.map((m) => (m.id === updatedModule.id ? updatedModule : m))
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/module/:moduleId"
          element={
            <ModuleOverview
              modules={modules}
              onUpdateModule={handleUpdateModule}
            />
          }
        />
        <Route
          path="/module/:moduleId/section/:sectionId"
          element={
            <ModuleOverview
              modules={modules}
              onUpdateModule={handleUpdateModule}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
