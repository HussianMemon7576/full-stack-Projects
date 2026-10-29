export const COOLDOWN_MS = 60 * 60 * 1000;

export const getRemainingCooldown = (
  lastChangedAt?: string | null
): number => {
  if (!lastChangedAt) return 0;

  const elapsed = Date.now() - new Date(lastChangedAt).getTime();

  return Math.max(0, COOLDOWN_MS - elapsed);
};

export const formatRemainingTime = (ms: number): string => {
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};