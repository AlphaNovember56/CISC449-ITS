import React, { useState } from 'react';
import { Button, Card, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PretestQuestion } from '../../types';
import { module1PretestQuestions } from './module1-questions';
import '../styles/Pretest.css';

interface Pretest1Props {
  module1: number;
  questions: PretestQuestion[];
  onComplete: (score: number, correctAnswers: number, unlockedSectionIds: number[]) => void;
}

export function Pretest1({ module1, questions, onComplete }: Pretest1Props) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (answered) return; // Prevent changing answer after submission

    setSelectedOption(optionIndex);
    setAnswered(true);

    // Check if answer is correct
    const correct = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setCorrectAnswerCount(correctAnswerCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
      setIsCorrect(false);
    } else {
      // Pretest is complete
      const unlockedSectionIds = [2]; // Example: unlock section 2
      onComplete(score, correctAnswerCount, unlockedSectionIds);
      navigate(`/module/${module1}`);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="pretest-page">
      {/* Header Section */}
      <header className="pretest-header">
        <div className="header-content">
            <button onClick={() => void navigate('/module/1')} className="back-button">
              ← Back to Module Overview
            </button>
          <div className="header-top">
            
            <h1 className="header-title">Module Pretest</h1>
          </div>
          <div className="header-progress">
            <p className="progress-text">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="progress-score">Progress: {score} / {currentQuestionIndex + 1} correct</p>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="pretest-container">
        <Card className="pretest-card">
          <Card.Body>
            <div className="pretest-question">
              <h3>{currentQuestion.question}</h3>

              <Form className="pretest-form">
                <Form.Group className="mb-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrectAnswer = index === currentQuestion.correctAnswer;

                    return (
                      <Form.Check
                        key={index}
                        type="radio"
                        name="pretest-options"
                        id={`option-${index}`}
                        label={option}
                        value={index}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(index)}
                        disabled={answered}
                        className={`pretest-option ${isSelected ? 'selected' : ''} ${
                          answered && isCorrectAnswer ? 'correct-answer' : ''
                        } ${answered && isSelected && !isCorrect ? 'incorrect-answer' : ''}`}
                      />
                    );
                  })}
                </Form.Group>
              </Form>

              {/* Feedback after answer */}
              {answered && (
                <Alert variant={isCorrect ? 'success' : 'danger'} className="mt-3">
                  {isCorrect ? (
                    <div>
                      <strong>✓ Correct!</strong>
                    </div>
                  ) : (
                    <div>
                      <strong>✗ Incorrect</strong>
                      <p className="mt-2 mb-0">
                        Correct answer: <strong>{currentQuestion.options[currentQuestion.correctAnswer]}</strong>
                      </p>
                    </div>
                  )}
                </Alert>
              )}

              {/* Placeholder for performance message */}
              <div className="pretest-info mt-3">
                <p className="text-muted small">
                  Your performance on this pretest will determine your initial learning difficulty adjustment (Beta = 0.1 × correct answers).
                </p>
              </div>
            </div>

            <div className="pretest-controls mt-4">
              {answered && (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!answered}
                >
                  {isLastQuestion ? 'Complete Pretest' : 'Next Question'}
                </Button>
              )}
              {!answered && (
                <p className="text-muted">Please select an option to continue.</p>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}