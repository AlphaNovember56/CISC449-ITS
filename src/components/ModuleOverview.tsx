import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { Module } from '../types';
import ProgressBarComponent from './ProgressBarComponent';
import Pretest from './Pretest';
import SectionComponent from './Section';
import '../styles/ModuleOverview.css';

interface ModuleOverviewProps {
  modules: Module[];
  onUpdateModule: (updatedModule: Module) => void;
}

const ModuleOverview: React.FC<ModuleOverviewProps> = ({
  modules,
  onUpdateModule,
}) => {
  const { moduleId, sectionId } = useParams<{ moduleId: string; sectionId?: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [viewingSection, setViewingSection] = useState<string | null>(sectionId || null);

  useEffect(() => {
    if (moduleId) {
      const foundModule = modules.find((m) => m.id === parseInt(moduleId));
      if (foundModule) {
        setModule(foundModule);
      }
    }
  }, [moduleId, modules]);

  if (!module) {
    return <div>Module not found</div>;
  }

  const handlePretestComplete = (score: number, unlockedSectionIds: number[]) => {
    const updatedModule = { ...module };
    updatedModule.pretestResult = {
      score,
      timestamp: new Date(),
      unlockedSections: unlockedSectionIds,
    };
    updatedModule.isStarted = true;

    // Unlock sections based on pretest score
    updatedModule.sections = updatedModule.sections.map((section) => {
      // Pretest is always unlocked
      if (section.title === 'Pretest') {
        return { ...section, isLocked: false };
      }
      // Unlock sections that are in the unlockedSectionIds array
      if (unlockedSectionIds.includes(section.id)) {
        return { ...section, isLocked: false };
      }
      return section;
    });

    setModule(updatedModule);
    onUpdateModule(updatedModule);
    setViewingSection(null);
  };

  const handleSectionClick = (sectionId: number) => {
    const section = module.sections.find((s) => s.id === sectionId);
    if (section && !section.isLocked) {
      setViewingSection(sectionId.toString());
    }
  };

  const handleBackToOverview = () => {
    setViewingSection(null);
  };

  const handleProgressUpdate = (progress: number) => {
    // Update overall module progress
    const totalProgress = module.sections.reduce((sum, s) => sum + s.progress, 0) / module.sections.length;
    const updatedModule = {
      ...module,
      overallProgress: Math.round(totalProgress),
    };
    setModule(updatedModule);
    onUpdateModule(updatedModule);
  };

  const pretest = module.sections.find((s) => s.title === 'Pretest');

  if (viewingSection) {
    if (viewingSection === '0' || pretest?.id === parseInt(viewingSection)) {
      return (
        <div className="module-overview-container">
          <Button
            onClick={handleBackToOverview}
            variant="outline-secondary"
            className="back-button"
          >
            ← Back to Module Overview
          </Button>
          {pretest && (
            <Pretest
              moduleId={module.id}
              onComplete={handlePretestComplete}
            />
          )}
        </div>
      );
    }

    const section = module.sections.find((s) => s.id === parseInt(viewingSection));
    if (section) {
      return (
        <div className="module-overview-container">
          <Button
            onClick={handleBackToOverview}
            variant="outline-secondary"
            className="back-button"
          >
            ← Back to Module Overview
          </Button>
          <SectionComponent
            section={section}
            moduleId={module.id}
            onProgressUpdate={handleProgressUpdate}
          />
        </div>
      );
    }
  }

  return (
    <div className="module-overview-container">
      <Button
        onClick={() => navigate('/')}
        variant="outline-secondary"
        className="back-button"
      >
        ← Back to Dashboard
      </Button>

      <Card className="module-overview-header">
        <Card.Body>
          <div className="module-title-section">
            <h1>
              {module.icon} {module.title}
            </h1>
            <p className="module-description">{module.description}</p>
          </div>
          <div className="module-stats">
            <ProgressBarComponent
              progress={module.overallProgress}
              label={`Overall Module Progress`}
              variant="success"
              size="lg"
            />
            <p className="module-status">
              {module.isStarted
                ? `Pretest Score: ${module.pretestResult?.score.toFixed(1) || 'N/A'}%`
                : 'Start with the Pretest to begin'}
            </p>
          </div>
        </Card.Body>
      </Card>

      <h3 className="sections-title">Module Sections</h3>

      <Row className="sections-grid">
        {module.sections.map((section) => (
          <Col md={6} lg={4} key={section.id} className="section-card-col">
            <Card
              className={`section-overview-card ${
                section.isLocked ? 'locked' : 'unlocked'
              }`}
              onClick={() =>
                !section.isLocked && handleSectionClick(section.id)
              }
            >
              <Card.Body>
                <div className="section-header-overview">
                  <div className="section-icon">
                    {section.isLocked ? '🔒' : '🔓'}
                  </div>
                  <h5 className="section-name">{section.title}</h5>
                </div>
                <p className="section-desc-small">{section.description}</p>

                {section.isLocked && (
                  <Alert variant="warning" className="lock-message">
                    Locked
                  </Alert>
                )}

                <ProgressBarComponent
                  progress={section.progress}
                  variant={section.isLocked ? 'warning' : 'info'}
                  size="sm"
                />

                {!section.isLocked && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-100 mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick(section.id);
                    }}
                  >
                    {section.progress === 0 ? 'Start' : 'Continue'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ModuleOverview;
