import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Module1 from './components/Module1/Module1';
import { Module,  } from './types';
import {Pretest1} from './components/Module1/Pretest1';
import { module1PretestQuestions } from './components/Module1/module1-questions';
import './App.css';

function App() { 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/module/1" element={<Module1 />} />
        <Route path="/module/1/pretest1" element={<Pretest1 module1={1} questions={module1PretestQuestions} onComplete={function (score: number, unlockedSectionIds: number[]): void {
        } } />} />

      </Routes>
    </Router>
  );
}

export default App;
