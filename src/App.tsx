import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Module1 from './components/Module1/Module1';
import { Module } from './types';
import { Pretest1 } from './components/Module1/Pretest1';
import { module1PretestQuestions } from './components/Module1/module1-questions';
import './App.css';

interface PretestResult {
  score: number;
  correctAnswers: number;
}

function App() {
  const [pretestResults, setPretestResults] = useState<Record<number, PretestResult>>({});

  const handlePretestComplete = (moduleId: number, score: number, correctAnswers: number, unlockedSectionIds: number[]) => {
    // Store the pretest result for the specific module
    const initialBeta = 0.1 * correctAnswers;
    
    setPretestResults(prev => ({
      ...prev,
      [moduleId]: { score, correctAnswers }
    }));

    console.log(`Module ${moduleId} Pretest Complete - Score: ${score}, Correct Answers: ${correctAnswers}, Initial Beta: ${initialBeta}`);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/module/1" element={<Module1 />} />
        <Route
          path="/module/1/pretest1"
          element={
            <Pretest1
              module1={1}
              questions={module1PretestQuestions}
              onComplete={(score, correctAnswers, unlockedSectionIds) =>
                handlePretestComplete(1, score, correctAnswers, unlockedSectionIds)
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
