import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, ErrorMessage, Loading, Screen } from "../../src/components/ui";
import { recipeRepository } from "../../src/services/recipeRepository";
import { useCookingStore } from "../../src/store/cooking";
import { useSavedStore } from "../../src/store/saved";
import { difficultyLabel, styles, theme } from "../../src/theme";
import type { Recipe } from "../../src/types/recipe";
import { formatIngredient } from "../../src/utils/ingredients";
export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const loaded = useSavedStore((state) => state.loaded);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(2);
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => {
    let alive = true;
    recipeRepository
      .get(id)
      .then((result) => {
        if (alive) {
          setRecipe(result ?? null);
          setServings(result?.servings ?? 2);
          setChecked([]);
        }
      })
      .catch(() => {
        if (alive) setRecipe(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [id, loaded]);
  if (loading)
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  if (!recipe)
    return (
      <Screen>
        <ErrorMessage message="No encontramos esta receta." />
        <Button title="Volver al inicio" onPress={() => router.replace("/")} />
      </Screen>
    );
  return (
    <Screen>
      <Text style={styles.eyebrow}>TODO SOBRE LA MESA</Text>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.body}>{recipe.description}</Text>
      <Text style={styles.muted}>
        {recipe.totalTimeMinutes} min en total ·{" "}
        {difficultyLabel[recipe.difficulty]}
        {"\n"}Preparación: {recipe.prepTimeMinutes} min · Cocción:{" "}
        {recipe.cookTimeMinutes} min
      </Text>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>PORCIONES</Text>
        <View style={styles.row}>
          <Button
            title="−"
            label="Disminuir porciones"
            secondary
            disabled={servings <= 1}
            onPress={() => setServings((value) => value - 1)}
          />
          <Text
            style={{ ...styles.title, flex: 1, textAlign: "center" }}
            accessibilityLiveRegion="polite"
          >
            {servings}
          </Text>
          <Button
            title="+"
            label="Aumentar porciones"
            secondary
            disabled={servings >= 12}
            onPress={() => setServings((value) => value + 1)}
          />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ ...styles.title, fontSize: 26 }}>Ingredientes</Text>
        <Text style={styles.muted}>Marca lo que ya tienes.</Text>
        {recipe.ingredients.map((ingredient) => {
          const selected = checked.includes(ingredient.id);
          return (
            <Pressable
              key={ingredient.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              accessibilityLabel={`${ingredient.name}, ${formatIngredient(ingredient, recipe.servings, servings)}`}
              onPress={() =>
                setChecked((current) =>
                  selected
                    ? current.filter((value) => value !== ingredient.id)
                    : [...current, ingredient.id],
                )
              }
              style={{
                flexDirection: "row",
                gap: 14,
                alignItems: "center",
                paddingVertical: 13,
                minHeight: 56,
                borderBottomWidth: 1,
                borderColor: "#D6CAB3",
              }}
            >
              <Text style={{ color: theme.colors.green, fontSize: 27 }}>
                {selected ? "☑" : "□"}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.body}>{ingredient.name}</Text>
                <Text style={styles.muted}>
                  {formatIngredient(ingredient, recipe.servings, servings)}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <Button
        title="¡A cocinar!"
        onPress={() => {
          useCookingStore.getState().start(recipe, servings);
          router.push("/cook");
        }}
      />
    </Screen>
  );
}
