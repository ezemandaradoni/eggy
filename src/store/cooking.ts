import { create } from "zustand";
import type { Recipe, RuntimeTimer } from "../types/recipe";
import { remaining } from "../utils/timers";
type CookingState = {
  recipe: Recipe | null;
  servings: number;
  stepIndex: number;
  timers: Record<string, RuntimeTimer>;
  start(recipe: Recipe, servings: number): void;
  move(index: number): void;
  control(id: string, action: "start" | "pause" | "reset", now?: number): void;
  tick(now?: number): void;
  clear(): void;
};
export const useCookingStore = create<CookingState>((set, get) => ({
  recipe: null,
  servings: 2,
  stepIndex: 0,
  timers: {},
  start(recipe, servings) {
    const timers: Record<string, RuntimeTimer> = {};
    recipe.steps.forEach((step, index) =>
      step.timers?.forEach((timer) => {
        const id = `${step.id}:${timer.id}`;
        timers[id] = {
          ...timer,
          id,
          stepId: step.id,
          stepNumber: index + 1,
          remainingSeconds: timer.durationSeconds,
          endsAt: null,
          status: "idle",
        };
      }),
    );
    set({ recipe, servings, stepIndex: 0, timers });
  },
  move(index) {
    if (get().recipe && index >= 0 && index < get().recipe!.steps.length)
      set({ stepIndex: index });
  },
  control(id, action, now = Date.now()) {
    const timer = get().timers[id];
    if (!timer) return;
    let next: RuntimeTimer;
    if (action === "reset")
      next = {
        ...timer,
        status: "idle",
        remainingSeconds: timer.durationSeconds,
        endsAt: null,
      };
    else if (action === "pause") {
      const seconds = remaining(timer, now);
      next = {
        ...timer,
        status: seconds === 0 ? "finished" : "paused",
        remainingSeconds: seconds,
        endsAt: null,
      };
    } else {
      if (timer.status === "running" || timer.status === "finished") return;
      next = {
        ...timer,
        status: "running",
        endsAt: now + timer.remainingSeconds * 1000,
      };
    }
    set({ timers: { ...get().timers, [id]: next } });
  },
  tick(now = Date.now()) {
    const timers = { ...get().timers };
    let changed = false;
    for (const timer of Object.values(timers))
      if (timer.status === "running" && remaining(timer, now) === 0) {
        timers[timer.id] = {
          ...timer,
          status: "finished",
          remainingSeconds: 0,
          endsAt: null,
        };
        changed = true;
      }
    if (changed) set({ timers });
  },
  clear() {
    set({ recipe: null, stepIndex: 0, timers: {} });
  },
}));
