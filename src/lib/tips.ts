export function getTips(pwd: string, classification?: string): string[] {
  if (!pwd) return [];
  const tips: string[] = [];
  if (pwd.length < 12) tips.push('Increase length to at least 12 characters');
  if (!/[A-Z]/.test(pwd)) tips.push('Add uppercase letters');
  if (!/[a-z]/.test(pwd)) tips.push('Add lowercase letters');
  if (!/[0-9]/.test(pwd)) tips.push('Include numbers');
  if (!/[^A-Za-z0-9]/.test(pwd)) tips.push('Use special characters (e.g., !@#$%^&*)');
  if (tips.length === 0 && classification !== 'Very Strong') tips.push('Avoid common words and patterns');
  return tips;
}
