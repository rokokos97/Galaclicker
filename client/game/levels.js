import { LEVELS } from "../config/constants"

export function getCurrentLevel(score) {
    return LEVELS.slice().reverse().find(level => score >= level.numberOfCodeLines) || LEVELS[0]
}
export function getNextLevel(score) {
    return LEVELS.find(level => score < level.numberOfCodeLines) || LEVELS[LEVELS.length - 1]
}