import type { RuntimeTimer } from "../types/recipe";
export function remaining(timer: RuntimeTimer, now = Date.now()): number {
  return timer.status === "running" && timer.endsAt !== null
    ? Math.max(0, Math.ceil((timer.endsAt - now) / 1000))
    : timer.remainingSeconds;
}
export function clock(seconds: number): string {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}
