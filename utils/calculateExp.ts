import { BEING_TOO_COOL_PENALTY, LEVEL_GROWTH } from "./expConstants";

export default function calculateQuestExperience(
  expPerLevel: number,
  currentLevel: number,
  questDifficulty: number
) {
  return (
    (expPerLevel / (currentLevel * LEVEL_GROWTH)) *
    ((currentLevel + questDifficulty) * BEING_TOO_COOL_PENALTY)
  ).toFixed(0);
}
