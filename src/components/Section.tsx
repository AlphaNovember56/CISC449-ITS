import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Section } from '../types';
import ProgressBarComponent from './ProgressBarComponent';
import '../styles/Section.css';

interface SectionProps {
  section: Section;
  moduleId: number;
  onProgressUpdate?: (progress: number) => void;
}

const SectionComponent: React.FC<SectionProps> = ({
  section,
  moduleId,
  onProgressUpdate,
}) => {
  const [progress, setProgress] = useState(section.progress);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleCompleteSection = () => {
    const newProgress = 100;
    setProgress(newProgress);
    setIsCompleted(true);
    if (onProgressUpdate) {
      onProgressUpdate(newProgress);
    }
  };

  const handleGoBack = () => {
    navigate(`/module/${moduleId}`);
  };

  if (section.isLocked) {
    return (
      <div className="section-container">
        <Card className="locked-section-card">
          <Card.Body className="text-center">
            <div className="lock-icon">🔒</div>
            <h4>Section Locked</h4>
            <p>{section.title}</p>
            <Alert variant="warning">
              Complete the pretest and earlier sections to unlock this content.
            </Alert>
            <Button onClick={handleGoBack} variant="secondary">
              Back to Module Overview
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="section-container">
      <Card className="section-card">
        <Card.Header className="section-header">
          <h3>{section.title}</h3>
          <p className="section-description">{section.description}</p>
        </Card.Header>
        <Card.Body>
          <ProgressBarComponent
            progress={progress}
            label="Section Progress"
            variant="info"
            size="md"
          />

          <div className="section-content">
            <Alert variant="info">
              <h5>📚 Learning Content</h5>
              <p>This is where the main content for "{section.title}" would be displayed.</p>
              <p>Content Type: <strong>{section.content}</strong></p>
              <ul style={{ marginTop: '15px', marginBottom: 0 }}>
                <li>Interactive lessons and explanations</li>
                <li>Code examples and demonstrations</li>
                <li>Practice exercises</li>
                <li>Hands-on projects</li>
              </ul>
            </Alert>

            {isCompleted && (
              <Alert variant="success" className="mt-3">
                ✓ Section Completed! Great work!
              </Alert>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="section-footer">
          <div className="button-group">
            <Button onClick={handleGoBack} variant="secondary">
              Back to Module
            </Button>
            <Button
              onClick={handleCompleteSection}
              variant="success"
              disabled={isCompleted}
            >
              {isCompleted ? '✓ Completed' : 'Mark as Complete'}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SectionComponent;
