import { Text, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  ErrorMessage,
  Loading,
  Mascot,
  Screen,
} from "../../src/components/ui";
import { useSavedStore } from "../../src/store/saved";
import { difficultyLabel, styles } from "../../src/theme";
export default function Saved() {
  const { recipes, loaded, busy, error, hydrate, remove } = useSavedStore();
  return (
    <Screen>
      <Text style={styles.eyebrow}>TU PEQUEÑO RECETARIO</Text>
      <Text style={styles.title}>Para volver a cocinar</Text>
      {!loaded && busy && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loaded && !busy && (
        <Button
          title="Volver a intentar"
          onPress={() => {
            void hydrate();
          }}
        />
      )}
      {loaded && !recipes.length && (
        <>
          <Mascot small />
          <Text style={styles.body}>
            Todavía no hay recetas guardadas. Al terminar de cocinar, guarda tus
            favoritas aquí.
          </Text>
          <Button title="Buscar una receta" onPress={() => router.push("/")} />
        </>
      )}
      {recipes.map((recipe) => (
        <View key={recipe.id} style={styles.card}>
          <Text style={{ ...styles.title, fontSize: 25, lineHeight: 31 }}>
            {recipe.title}
          </Text>
          <Text style={styles.body}>{recipe.description}</Text>
          <Text style={styles.muted}>
            {recipe.totalTimeMinutes} min · {difficultyLabel[recipe.difficulty]}
          </Text>
          <Button
            title="Ver receta"
            onPress={() =>
              router.push({
                pathname: "/recipes/[id]",
                params: { id: recipe.id },
              })
            }
          />
          <Button
            title="Eliminar receta"
            label={`Eliminar ${recipe.title}`}
            secondary
            disabled={busy}
            onPress={() => {
              void remove(recipe.id);
            }}
          />
        </View>
      ))}
    </Screen>
  );
}
