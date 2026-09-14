import assert from "node:assert/strict";
import { test } from "node:test";
import { mockRecipes } from "../src/data/recipes";
import { formatIngredient, scaledQuantity } from "../src/utils/ingredients";
import { clock, remaining } from "../src/utils/timers";
import { useCookingStore } from "../src/store/cooking";
import { createSavedStore } from "../src/store/createSavedStore";
import { cookingService } from "../src/services/cookingService";
import type { Recipe } from "../src/types/recipe";
const recipe = mockRecipes[0]!;
test("servings scale from the baseline, preserve non-scalable quantities, and do not mutate recipes", () => {
  const original = JSON.stringify(recipe);
  const potato = recipe.ingredients.find((item) => item.id === "potato")!;
  assert.equal(formatIngredient(potato, 2, 4), "1 kg");
  assert.equal(scaledQuantity(potato, 2, 3), 750);
  for (let i = 0; i < 100; i++) {
    scaledQuantity(potato, 2, 7);
    scaledQuantity(potato, 2, 1);
  }
  assert.equal(scaledQuantity(potato, 2, 2), 500);
  assert.equal(scaledQuantity({ ...potato, scalable: false }, 2, 4), 500);
  assert.equal(
    formatIngredient(
      recipe.ingredients.find((item) => item.id === "salt")!,
      2,
      4,
    ),
    "al gusto",
  );
  assert.equal(JSON.stringify(recipe), original);
});
test("multiple timers survive step navigation, pause/resume, delayed ticks, reset, and fresh sessions", () => {
  const multiple: Recipe = {
    ...recipe,
    steps: [
      {
        id: "one",
        instruction: "Cocina",
        timers: [
          { id: "a", label: "A", durationSeconds: 10 },
          { id: "b", label: "B", durationSeconds: 20 },
        ],
      },
      { id: "two", instruction: "Sirve" },
    ],
  };
  useCookingStore.getState().start(multiple, 4);
  useCookingStore.getState().control("one:a", "start", 1000);
  useCookingStore.getState().control("one:b", "start", 1000);
  useCookingStore.getState().move(1);
  assert.equal(remaining(useCookingStore.getState().timers["one:a"]!, 4500), 7);
  useCookingStore.getState().control("one:a", "pause", 5000);
  assert.equal(
    remaining(useCookingStore.getState().timers["one:a"]!, 90000),
    6,
  );
  useCookingStore.getState().control("one:a", "start", 100000);
  assert.equal(
    remaining(useCookingStore.getState().timers["one:a"]!, 102000),
    4,
  );
  useCookingStore.getState().tick(200000);
  assert.equal(useCookingStore.getState().timers["one:a"]!.status, "finished");
  assert.equal(useCookingStore.getState().timers["one:b"]!.status, "finished");
  assert.equal(
    clock(remaining(useCookingStore.getState().timers["one:a"]!, 300000)),
    "00:00",
  );
  useCookingStore.getState().control("one:a", "reset");
  assert.equal(
    useCookingStore.getState().timers["one:a"]!.remainingSeconds,
    10,
  );
  useCookingStore.getState().move(20);
  assert.equal(useCookingStore.getState().stepIndex, 1);
  useCookingStore.getState().start(recipe, 2);
  assert.equal(useCookingStore.getState().stepIndex, 0);
  assert.equal(useCookingStore.getState().timers["one:a"], undefined);
});
test("saved recipes survive a new store, can be cooked again, deduplicate, and remain removed", async () => {
  let disk = "[]";
  const storage = {
    async read(): Promise<Recipe[]> {
      return JSON.parse(disk);
    },
    async write(value: Recipe[]) {
      disk = JSON.stringify(value);
    },
  };
  const first = createSavedStore(storage);
  await first.getState().hydrate();
  assert.equal(await first.getState().save(recipe), true);
  await first.getState().save(recipe);
  assert.equal(first.getState().recipes.length, 1);
  const restarted = createSavedStore(storage);
  await restarted.getState().hydrate();
  assert.equal(restarted.getState().recipes[0]!.title, recipe.title);
  useCookingStore.getState().start(restarted.getState().recipes[0]!, 3);
  assert.equal(useCookingStore.getState().recipe!.id, recipe.id);
  assert.equal(useCookingStore.getState().servings, 3);
  await restarted.getState().remove(recipe.id);
  const afterRemoval = createSavedStore(storage);
  await afterRemoval.getState().hydrate();
  assert.deepEqual(afterRemoval.getState().recipes, []);
});
test("failed persistence does not report a recipe as saved or overwrite unread storage", async () => {
  const store = createSavedStore({
    async read() {
      return [];
    },
    async write() {
      throw new Error("disk full");
    },
  });
  assert.equal(await store.getState().save(recipe), false);
  await store.getState().hydrate();
  assert.equal(await store.getState().save(recipe), false);
  assert.deepEqual(store.getState().recipes, []);
  assert.ok(store.getState().error);
});
test("mock suggestions contain summaries, selected recipes are complete, and Ask receives cooking context", async () => {
  const candidates = await cookingService.suggest({
    message: "pollo al horno con papas",
    complexity: "normal",
  });
  assert.equal(candidates.length, 3);
  assert.equal("steps" in candidates[0]!, false);
  const generated = await cookingService.generate({
    candidate: candidates[0]!,
    originalRequest: "pollo",
    servings: 2,
  });
  assert.ok(generated.ingredients.length && generated.steps.length);
  const answer = await cookingService.ask({
    question: "Se está dorando demasiado rápido",
    recipe: generated,
    currentStep: generated.steps[0]!,
    previousSteps: [],
    upcomingSteps: generated.steps.slice(1),
    activeTimers: [],
    servings: 2,
  });
  assert.match(answer, /temperatura/);
});
