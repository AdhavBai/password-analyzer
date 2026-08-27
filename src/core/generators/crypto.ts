export type GeneratorOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export function generatePassword(options: GeneratorOptions): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const nums = '0123456789';
  const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  let pool = '';
  if (options.uppercase) pool += upper;
  if (options.lowercase) pool += lower;
  if (options.numbers) pool += nums;
  if (options.symbols) pool += syms;
  
  if (pool === '') return '';
  
  let result = '';
  // Ensure we use crypto.getRandomValues if available, fallback to Math.random
  const useCrypto = typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues;
  
  for (let i = 0; i < options.length; i++) {
    if (useCrypto) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      result += pool[array[0] % pool.length];
    } else {
      result += pool[Math.floor(Math.random() * pool.length)];
    }
  }
  
  return result;
}
