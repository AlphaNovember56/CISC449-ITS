import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { Section } from '../../types';
import '../styles/SectionContent.css';

interface SectionContentProps {
  section: Section;
  moduleId: number;
  onSectionComplete: () => void;
  onBack: () => void;
}
