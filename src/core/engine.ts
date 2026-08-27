import { calculateEntropy, estimateCrackTime, estimateCost } from './algorithms/entropy';
import { checkPenalties, PenaltyDetail } from './rules/penalties';

export type StrengthClassification = 'Weak' | 'Medium' | 'Strong' | 'Very Strong';

export type AnalysisResult = {
  score: number; // 0-100
  entropy: number;
  crackTime: string;
  cost: string;
  classification: StrengthClassification;
  penalties: PenaltyDetail[];
}

export function analyzePassword(password: string): AnalysisResult {
  if (!password) {
    return {
      score: 0,
      entropy: 0,
      crackTime: 'Instant',
      cost: '< $0.01',
      classification: 'Weak',
      penalties: []
    };
  }

  const entropy = calculateEntropy(password);
  const penalties = checkPenalties(password);
  
  const totalPenalty = penalties.reduce((sum, p) => sum + p.deduction, 0);
  
  // Base score mapped from entropy (e.g., 80 bits is 100 score)
  let score = (entropy / 80) * 100;
  score = Math.min(100, Math.max(0, score));
  
  // Apply penalties
  score -= totalPenalty;
  score = Math.min(100, Math.max(0, Math.round(score)));

  let classification: StrengthClassification = 'Weak';
  if (score > 80 && entropy > 60 && totalPenalty === 0) classification = 'Very Strong';
  else if (score > 60) classification = 'Strong';
  else if (score > 40) classification = 'Medium';

  return {
    score,
    entropy,
    crackTime: estimateCrackTime(entropy),
    cost: estimateCost(entropy),
    classification,
    penalties
  };
}
