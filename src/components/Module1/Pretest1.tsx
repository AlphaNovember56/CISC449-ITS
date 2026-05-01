import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PretestQuestion } from '../../types';
import {module1PretestQuestions} from './module1-questions';
import '../styles/Pretest.css'; 


interface Pretest1Props {
  module1: number;
  questions: PretestQuestion[]; // Module-specific pretest questions
  onComplete: (score: number, unlockedSectionIds: number[]) => void;
}


export function Pretest1({ module1, questions, onComplete }: Pretest1Props) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

    const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    };

    const handleSubmit = () => {
    if (selectedOption === null) {
        setShowAlert(true);
    } else {
        // Process the selected option and update the score
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1);
        }
        setShowAlert(false);
        }
        if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        }
        else {
        // Pretest is complete, determine unlocked sections based on score
        const unlockedSectionIds =  [2]; // Example: unlock section 2 if score is 3 or higher
        onComplete(score, unlockedSectionIds);
        navigate(`/module/${module1}`);
    }
    };

    return (
        <div>
            <div>
                <button onClick={() => void navigate("/module/1")} className="back-button">← Back to Module Overview</button></div>

            <h1>Pretest</h1>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <header>
            <Card className="pretest-card">
        <Card.Body>
        <Card.Title>Pretest</Card.Title>
        <Card.Text>
            Question {currentQuestionIndex + 1} of {questions.length}
        </Card.Text>
    </Card.Body>
</Card>
</header>
            <div className="pretest-question">
                <h3>{questions[currentQuestionIndex].question}</h3>
                <ul>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <li key={index}>
                            <button onClick={() => handleOptionSelect(index)}>{option}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {showAlert && <Alert variant="danger">Please select an option before submitting.</Alert>}
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}