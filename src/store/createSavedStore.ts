import { create } from "zustand";
import type { RecipeStorage } from "../storage/recipes";
import type { Recipe } from "../types/recipe";
type SavedState = {
  recipes: Recipe[];
  loaded: boolean;
  busy: boolean;
  error: string | null;
  hydrate(): Promise<void>;
  save(recipe: Recipe): Promise<boolean>;
  remove(id: string): Promise<boolean>;
};
export function createSavedStore(storage: RecipeStorage) {
  return create<SavedState>((set, get) => ({
    recipes: [],
    loaded: false,
    busy: false,
    error: null,
    async hydrate() {
      if (get().busy || get().loaded) return;
      set({ busy: true, error: null });
      try {
        set({ recipes: await storage.read(), loaded: true });
      } catch {
        set({ error: "No pudimos cargar tus recetas. Inténtalo de nuevo." });
      } finally {
        set({ busy: false });
      }
    },
    async save(recipe) {
      if (get().busy || !get().loaded) return false;
      set({ busy: true, error: null });
      const recipes = [
        ...get().recipes.filter((item) => item.id !== recipe.id),
        recipe,
      ];
      try {
        await storage.write(recipes);
        set({ recipes });
        return true;
      } catch {
        set({ error: "No pudimos guardar la receta. Inténtalo de nuevo." });
        return false;
      } finally {
        set({ busy: false });
      }
    },
    async remove(id) {
      if (get().busy || !get().loaded) return false;
      set({ busy: true, error: null });
      const recipes = get().recipes.filter((item) => item.id !== id);
      try {
        await storage.write(recipes);
        set({ recipes });
        return true;
      } catch {
        set({ error: "No pudimos eliminar la receta. Inténtalo de nuevo." });
        return false;
      } finally {
        set({ busy: false });
      }
    },
  }));
}
