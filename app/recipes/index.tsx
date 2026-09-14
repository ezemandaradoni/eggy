import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, ErrorMessage, Loading, Screen } from "../../src/components/ui";
import { recipeRepository } from "../../src/services/recipeRepository";
import { cookingService } from "../../src/services/cookingService";
import { difficultyLabel, styles } from "../../src/theme";
import type {
  CookingComplexity,
  RecipeSuggestion,
} from "../../src/types/recipe";
export default function Suggestions() {
  const params = useLocalSearchParams<{
    message: string;
    complexity: string;
  }>();
  const message = params.message ?? "";
  const complexity: CookingComplexity =
    params.complexity === "quick" || params.complexity === "elaborate"
      ? params.complexity
      : "normal";
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let alive = true;
    cookingService
      .suggest({ message, complexity })
      .then((result) => {
        if (alive) setSuggestions(result);
      })
      .catch(() => {
        if (alive)
          setError("No pudimos preparar las ideas. Vuelve a intentarlo.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [message, complexity, attempt]);
  async function select(candidate: RecipeSuggestion) {
    setSelecting(candidate.id);
    setError(null);
    try {
      const recipe = await recipeRepository.generate({
        candidate,
        originalRequest: message,
        servings: 2,
      });
      router.push({ pathname: "/recipes/[id]", params: { id: recipe.id } });
    } catch {
      setError("No pudimos abrir la receta. Inténtalo de nuevo.");
    } finally {
      setSelecting(null);
    }
  }
  return (
    <Screen>
      <Text style={styles.eyebrow}>HOY COCINAMOS ALGO RICO</Text>
      <Text style={styles.title}>Tres ideas para ti</Text>
      <Text style={styles.body}>{message}</Text>
      <Text style={styles.muted}>
        Estas son las recetas de demostración de Eggy.
      </Text>
      {loading ? (
        <Loading text="Eggy está buscando ideas…" />
      ) : (
        suggestions.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={{ ...styles.title, fontSize: 25, lineHeight: 31 }}>
              {item.title}
            </Text>
            <Text style={styles.body}>{item.description}</Text>
            <Text style={styles.eyebrow}>
              {item.totalTimeMinutes} min · {difficultyLabel[item.difficulty]}
            </Text>
            <Button
              title={selecting === item.id ? "Preparando receta…" : "Elegir"}
              disabled={selecting !== null}
              onPress={() => {
                void select(item);
              }}
            />
          </View>
        ))
      )}
      {error && (
        <>
          <ErrorMessage message={error} />
          <Button
            title="Volver a intentar"
            secondary
            onPress={() => {
              setLoading(true);
              setError(null);
              setAttempt((value) => value + 1);
            }}
          />
        </>
      )}
    </Screen>
  );
}
