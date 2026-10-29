
import CustomError from "./customError.js";

export function checkCooldown(
  lastChanged: Date | null | undefined
) {
  const COOLDOWN_MS = 12 * 60 * 60 * 1000;



  if (!lastChanged) {
    console.log("No previous password update date found");
    return;
  }

  const lastChangedTime = new Date(lastChanged);
  const currentTime = Date.now();
  const elapsed = currentTime - lastChangedTime.getTime();



  if (elapsed < COOLDOWN_MS) {
    throw new CustomError(
      "You can change your password only after 12 hours",
      429
    );
  }
}