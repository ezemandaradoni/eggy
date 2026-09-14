import { recipeStorage } from "../storage/recipes";
import { createSavedStore } from "./createSavedStore";
export const useSavedStore = createSavedStore(recipeStorage);
