import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { samplePretestQuestions } from '../data';
import '../styles/Pretest.css';

interface PretestProps {
  moduleId: number;
  onComplete: (score: number, unlockedSectionIds: number[]) => void;
  allSectionIds?: number[]; // Optional: pass all section IDs for the module
}

const Pretest: React.FC<PretestProps> = ({ moduleId, onComplete, allSectionIds }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  const questions = samplePretestQuestions;

  // Default section IDs if not provided
  const getDefaultSectionIds = () => {
    switch (moduleId) {
      case 1:
        return [1, 2, 3, 4, 5, 6, 7, 8];
      case 2:
        return [9, 10, 11, 12, 13, 14, 15];
      case 3:
        return [16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
      case 4:
        return [26, 27, 28, 29, 30, 31, 32, 33, 34];
      default:
        return [];
    }
  };

  const sectionIds = allSectionIds || getDefaultSectionIds();
  const pretestId = sectionIds[0]; // First section is pretest
  const nonPretestSections = sectionIds.slice(1); // Remaining sections

  const handleAnswerClick = (index: number) => {
    if (!answered) {
      setSelectedAnswer(index);
      const correct = index === questions[currentQuestion].correctAnswer;
      if (correct) {
        setScore(score + 1);
      }
      setAnswered(true);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      // Calculate unlocked sections based on score
      const percentage = (score / questions.length) * 100;
      let unlockedSectionIds: number[] = [];

      // Unlock sections based on score thresholds
      if (percentage >= 40) {
        // Unlock all learning sections and posttest
        unlockedSectionIds = nonPretestSections;
      } else if (percentage >= 20) {
        // Unlock first two sections
        unlockedSectionIds = nonPretestSections.slice(0, 2);
      } else {
        // Unlock only first section
        unlockedSectionIds = [nonPretestSections[0]];
      }

      setShowScore(true);
      onComplete(percentage, unlockedSectionIds);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="pretest-container">
      <Card className="pretest-card">
        <Card.Header className="pretest-header">
          <h3>Module {moduleId} - Pretest</h3>
          <p>Question {currentQuestion + 1} of {questions.length}</p>
        </Card.Header>
        <Card.Body>
          {!showScore ? (
            <>
              <div className="progress-bar-pretest">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
              <h5 className="question-text">
                {questions[currentQuestion].question}
              </h5>
              <div className="answers-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    className={`answer-button ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      answered && index === questions[currentQuestion].correctAnswer
                        ? 'correct'
                        : ''
                    } ${
                      answered &&
                      selectedAnswer === index &&
                      index !== questions[currentQuestion].correctAnswer
                        ? 'incorrect'
                        : ''
                    }`}
                    onClick={() => handleAnswerClick(index)}
                    disabled={answered}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {answered && (
                <Alert
                  variant={
                    selectedAnswer === questions[currentQuestion].correctAnswer
                      ? 'success'
                      : 'danger'
                  }
                  className="mt-3"
                >
                  {selectedAnswer === questions[currentQuestion].correctAnswer
                    ? '✓ Correct!'
                    : '✗ Incorrect'}
                </Alert>
              )}
            </>
          ) : (
            <div className="score-container">
              <h4>Pretest Complete!</h4>
              <p className="final-score">
                Your Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
              </p>
              <Alert variant="info">
                Based on your performance, sections have been unlocked for you to
                learn from. Start with the first section and progress at your own
                pace!
              </Alert>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="pretest-footer">
          {!showScore ? (
            <Button
              onClick={handleNext}
              variant="primary"
              disabled={!answered}
              className="w-100"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Pretest' : 'Next Question'}
            </Button>
          ) : (
            <Button onClick={handleBackToDashboard} variant="success" className="w-100">
              Back to Module Overview
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Pretest;
