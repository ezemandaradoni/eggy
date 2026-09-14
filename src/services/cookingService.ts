import { mockRecipes } from "../data/recipes";
import type {
  CookingComplexity,
  CookingStep,
  Recipe,
  RecipeSuggestion,
  RuntimeTimer,
} from "../types/recipe";
export type AskContext = {
  question: string;
  recipe: Recipe;
  currentStep: CookingStep;
  previousSteps: CookingStep[];
  upcomingSteps: CookingStep[];
  activeTimers: RuntimeTimer[];
  servings: number;
};
export interface CookingService {
  suggest(input: {
    message: string;
    complexity: CookingComplexity;
  }): Promise<RecipeSuggestion[]>;
  generate(input: {
    candidate: RecipeSuggestion;
    originalRequest: string;
    servings: number;
  }): Promise<Recipe>;
  getRecipe(id: string): Promise<Recipe | undefined>;
  ask(context: AskContext): Promise<string>;
}
const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 650));
export const cookingService: CookingService = {
  async suggest({ message, complexity }) {
    await delay();
    const pastaFirst = /pasta|tomate/i.test(message) || complexity === "quick";
    return [...mockRecipes]
      .sort((a, b) =>
        pastaFirst
          ? a.totalTimeMinutes - b.totalTimeMinutes
          : b.totalTimeMinutes - a.totalTimeMinutes,
      )
      .map(({ id, title, description, totalTimeMinutes, difficulty }) => ({
        id,
        title,
        description,
        totalTimeMinutes,
        difficulty,
      }));
  },
  async generate({ candidate }) {
    await delay();
    const recipe = mockRecipes.find((item) => item.id === candidate.id);
    if (!recipe)
      throw new Error("No encontramos esta receta. Vuelve a intentarlo.");
    return recipe;
  },
  async getRecipe(id) {
    return mockRecipes.find((recipe) => recipe.id === id);
  },
  async ask({ question, currentStep, activeTimers }) {
    await delay();
    if (/dora|quem|rápido/i.test(question))
      return "Baja un poco la temperatura. Si la superficie ya está bien dorada, puedes cubrir la bandeja suavemente con papel aluminio y continuar la cocción.";
    if (/tiempo|falta|temporizador/i.test(question) && activeTimers.length)
      return `Tienes ${activeTimers.length} temporizador(es) en marcha. Revisa sus contadores: el tiempo es orientativo; comprueba también el punto de cocción antes de avanzar.`;
    if (/peg/i.test(question))
      return "Baja un poco el fuego. Añade una pequeña cantidad de agua si hace falta y espera unos segundos antes de mover la comida con suavidad.";
    return `Vamos paso a paso. Ahora: ${currentStep.instruction} ${currentStep.tips?.[0] ?? "Comprueba el resultado antes de continuar."}`;
  },
};
