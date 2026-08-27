import { analyzePassword } from '../src/core/engine';

describe('Password Analyzer Engine', () => {
  it('should return weak for empty password', () => {
    const result = analyzePassword('');
    expect(result.classification).toBe('Weak');
    expect(result.score).toBe(0);
    expect(result.entropy).toBe(0);
  });

  it('should apply sequence penalty', () => {
    const result = analyzePassword('abcdef123');
    const hasSequence = result.penalties.some(p => p.rule === 'Sequence');
    expect(hasSequence).toBe(true);
  });

  it('should apply keyboard walk penalty', () => {
    const result = analyzePassword('qwertyuiop');
    const hasWalk = result.penalties.some(p => p.rule === 'Keyboard Walk');
    expect(hasWalk).toBe(true);
  });

  it('should classify strong password correctly', () => {
    const result = analyzePassword('Tr0ub4dour&31!A'); // complex pass
    expect(result.classification).toBe('Very Strong');
    expect(result.score).toBeGreaterThan(80);
    expect(result.penalties.length).toBe(0);
  });
});
