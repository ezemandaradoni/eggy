import { cookingService } from "./cookingService";
import { useSavedStore } from "../store/saved";
import type { Recipe } from "../types/recipe";
const generatedRecipes = new Map<string, Recipe>();
export const recipeRepository = {
  async generate(input: Parameters<typeof cookingService.generate>[0]) {
    const recipe = await cookingService.generate(input);
    generatedRecipes.set(recipe.id, recipe);
    return recipe;
  },
  async get(id: string) {
    return (
      useSavedStore.getState().recipes.find((recipe) => recipe.id === id) ??
      generatedRecipes.get(id) ??
      (await cookingService.getRecipe(id))
    );
  },
};
