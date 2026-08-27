import { checkPenalties } from '../src/core/rules/penalties';

describe('Penalties Rules', () => {
  it('should detect short passwords', () => {
    const penalties = checkPenalties('short');
    expect(penalties.some(p => p.rule === 'Length')).toBe(true);
  });
});
