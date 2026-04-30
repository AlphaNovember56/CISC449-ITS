import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PretestQuestion } from '../../types';
import '../../styles/Pretest.css';

interface PretestProps {
  module1: number;
  questions: PretestQuestion[]; // Module-specific pretest questions
  onComplete: (score: number, unlockedSectionIds: number[]) => void;
  allSectionIds?: number[]; // Optional: pass all section IDs for the module
}
