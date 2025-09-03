import { TimeUnits } from "constants/tasks";

export function determineTimeUnit(duration) {
  if (!duration) return TimeUnits.Minutes;

  if (duration < 60) return TimeUnits.Minutes;
  if (duration >= 60 * 24 && duration % (60 * 24) === 0) return TimeUnits.Days;
  if (duration >= 60 && duration % 60 === 0) return TimeUnits.Hours;
  return TimeUnits.Minutes;
}

export function convertDuration(duration, timeUnit) {
  if (!duration || !timeUnit) return null;

  let factor;
  if (timeUnit === TimeUnits.Minutes) factor = 1;
  if (timeUnit === TimeUnits.Hours) factor = 60;
  if (timeUnit === TimeUnits.Days) factor = 60 * 24;
  return duration * factor; // convert to minutes
}
