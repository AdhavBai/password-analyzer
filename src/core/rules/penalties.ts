export type PenaltyDetail = {
  rule: string;
  deduction: number;
  message: string;
}

export function checkPenalties(password: string): PenaltyDetail[] {
  const penalties: PenaltyDetail[] = [];
  
  // Rule 1: Too short
  if (password.length > 0 && password.length < 8) {
    penalties.push({
      rule: 'Length',
      deduction: 15,
      message: 'Password is too short (under 8 characters)'
    });
  }

  // Rule 2: Repeated characters (e.g. 'aaaaa')
  const repeatRegex = /(.)\1{2,}/g;
  let match;
  while ((match = repeatRegex.exec(password)) !== null) {
    penalties.push({
      rule: 'Repeats',
      deduction: match[0].length * 2,
      message: `Repeated character sequence found ("${match[0]}")`
    });
  }

  // Rule 3: Sequences (e.g. '12345' or 'abcde')
  const lowerPass = password.toLowerCase();
  for (let i = 0; i < lowerPass.length - 2; i++) {
    const code1 = lowerPass.charCodeAt(i);
    const code2 = lowerPass.charCodeAt(i + 1);
    const code3 = lowerPass.charCodeAt(i + 2);
    
    if (code2 === code1 + 1 && code3 === code2 + 1) {
      penalties.push({
        rule: 'Sequence',
        deduction: 10,
        message: 'Sequential characters found (e.g. "abc", "123")'
      });
      break; // Only penalize once for sequences
    }
  }
  
  // Rule 4: Keyboard walks (e.g., 'qwerty')
  const walks = ['qwerty', 'asdfgh', 'zxcvbn', '123456'];
  for (const walk of walks) {
    if (lowerPass.includes(walk)) {
      penalties.push({
        rule: 'Keyboard Walk',
        deduction: 15,
        message: 'Common keyboard pattern found'
      });
    }
  }

  return penalties;
}
