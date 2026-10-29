const COOLDOWN_MS = 12 * 60 * 60 * 1000;

type SecurityAction = "username" | "password";

const COOLDOWN_KEYS: Record<SecurityAction, string> = {
  username: "usernameCooldown",
  password: "passwordCooldown",
};

export const startSecurityCooldown = (
  action: SecurityAction
): void => {
  const cooldownUntil = Date.now() + COOLDOWN_MS;

  localStorage.setItem(
    COOLDOWN_KEYS[action],
    String(cooldownUntil)
  );
};

export const getCooldownRemaining = ( action: SecurityAction): number => {
  const savedUntil = Number(  localStorage.getItem(COOLDOWN_KEYS[action]) ?? 0);

  const remaining = savedUntil - Date.now();

  if (remaining <= 0) {
    localStorage.removeItem(COOLDOWN_KEYS[action]);
    return 0;
  }

  return remaining;
};

export const formatCooldownTime = (
  milliseconds: number
): string => {
  const totalMinutes = Math.ceil(milliseconds / 60000);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hours and ${minutes} minutes`;
  }

  if (hours > 0) {
    return `${hours} hours`;
  }

  return `${minutes} minutes`;
};