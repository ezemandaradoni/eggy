import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Recipe } from "../types/recipe";
const KEY = "eggy.saved-recipes.v1";
export interface RecipeStorage {
  read(): Promise<Recipe[]>;
  write(recipes: Recipe[]): Promise<void>;
}
export const recipeStorage: RecipeStorage = {
  async read() {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    if (
      !Array.isArray(data) ||
      !data.every(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.title === "string" &&
          typeof item.servings === "number" &&
          Array.isArray(item.ingredients) &&
          Array.isArray(item.steps) &&
          item.steps.length > 0,
      )
    )
      throw new Error("No se pudieron leer tus recetas guardadas.");
    return data as Recipe[];
  },
  async write(recipes) {
    await AsyncStorage.setItem(KEY, JSON.stringify(recipes));
  },
};
