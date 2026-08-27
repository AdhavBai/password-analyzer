export function calculateEntropy(password: string): number {
  if (!password) return 0;
  
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) return 0;

  const entropy = password.length * Math.log2(poolSize);
  return Math.round(entropy * 100) / 100;
}

export function estimateCrackTime(entropy: number): string {
  // Rough estimate based on high-end cloud GPU cluster (e.g. 100 GH/s)
  // Let's assume 10^11 hashes per second
  const hashesPerSecond = 100_000_000_000;
  const totalHashes = Math.pow(2, entropy);
  const seconds = totalHashes / hashesPerSecond;

  if (seconds < 1) return 'Instant';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  
  return '> 100 years';
}

export function estimateCost(entropy: number): string {
  // Assume $2 per hour for a high end GPU that does 100 GH/s
  const hashesPerSecond = 100_000_000_000;
  const hashesPerHour = hashesPerSecond * 3600;
  const costPerHour = 2; // $2
  const totalHashes = Math.pow(2, entropy);
  const hours = totalHashes / hashesPerHour;
  const cost = hours * costPerHour;
  
  if (cost < 0.01) return '< $0.01';
  if (cost > 1000000) return '> $1M';
  return `$${cost.toFixed(2)}`;
}
