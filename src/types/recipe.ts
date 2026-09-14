export type Difficulty = "easy" | "medium" | "hard";
export type CookingComplexity = "quick" | "normal" | "elaborate";
export type IngredientUnit =
  "g" | "kg" | "ml" | "l" | "unit" | "tbsp" | "tsp" | "cup" | null;
export type Ingredient = {
  id: string;
  name: string;
  quantity: number | null;
  unit: IngredientUnit;
  notes?: string;
  scalable: boolean;
};
export type CookingTimerDefinition = {
  id: string;
  label: string;
  durationSeconds: number;
};
export type CookingStep = {
  id: string;
  title?: string;
  instruction: string;
  timers?: CookingTimerDefinition[];
  tips?: string[];
  ingredientsUsed?: string[];
};
export type Recipe = {
  id: string;
  title: string;
  description: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  steps: CookingStep[];
  tags: string[];
  createdAt: string;
};
export type RecipeSuggestion = Pick<
  Recipe,
  "id" | "title" | "description" | "totalTimeMinutes" | "difficulty"
>;
export type RuntimeTimer = {
  id: string;
  stepId: string;
  stepNumber: number;
  label: string;
  durationSeconds: number;
  remainingSeconds: number;
  endsAt: number | null;
  status: "idle" | "running" | "paused" | "finished";
};
