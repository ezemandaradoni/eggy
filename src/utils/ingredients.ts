import type { Ingredient } from "../types/recipe";
export function scaledQuantity(
  ingredient: Ingredient,
  baseline: number,
  servings: number,
): number | null {
  if (ingredient.quantity === null) return null;
  return ingredient.scalable
    ? (ingredient.quantity * servings) / baseline
    : ingredient.quantity;
}
const units = {
  g: "g",
  kg: "kg",
  ml: "ml",
  l: "l",
  unit: "ud.",
  tbsp: "cda.",
  tsp: "cdta.",
  cup: "taza(s)",
};
export function formatIngredient(
  ingredient: Ingredient,
  baseline: number,
  servings: number,
): string {
  let quantity = scaledQuantity(ingredient, baseline, servings);
  if (quantity === null) return ingredient.notes ?? "al gusto";
  let unit = ingredient.unit;
  if (unit === "g" && quantity >= 1000) {
    quantity /= 1000;
    unit = "kg";
  }
  if (unit === "ml" && quantity >= 1000) {
    quantity /= 1000;
    unit = "l";
  }
  return `${Number(quantity.toFixed(2)).toLocaleString("es")} ${unit ? units[unit] : ""}${ingredient.notes ? ` · ${ingredient.notes}` : ""}`.trim();
}
