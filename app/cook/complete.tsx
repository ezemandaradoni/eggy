import { Text } from "react-native";
import { router } from "expo-router";
import { Button, ErrorMessage, Mascot, Screen } from "../../src/components/ui";
import { useCookingStore } from "../../src/store/cooking";
import { useSavedStore } from "../../src/store/saved";
import { styles } from "../../src/theme";
export default function Complete() {
  const recipe = useCookingStore((state) => state.recipe);
  const { recipes, save, busy, error, loaded, hydrate } = useSavedStore();
  const saved = recipes.some((item) => item.id === recipe?.id);
  return (
    <Screen>
      <Mascot celebrate />
      <Text
        style={{
          ...styles.title,
          textAlign: "center",
          fontSize: 48,
          lineHeight: 58,
        }}
      >
        ¡Listo!
      </Text>
      <Text style={{ ...styles.body, textAlign: "center" }}>
        {recipe
          ? `Tu receta de ${recipe.title.toLowerCase()} está terminada.`
          : "Tu próxima receta te espera."}
      </Text>
      <Text style={{ ...styles.muted, textAlign: "center" }}>
        Disfruta lo que preparaste. Te lo has ganado.
      </Text>
      {recipe && (
        <Button
          title={
            saved ? "Receta guardada" : busy ? "Guardando…" : "Guardar receta"
          }
          disabled={saved || busy || !loaded}
          onPress={() => {
            void save(recipe);
          }}
        />
      )}
      {error && <ErrorMessage message={error} />}
      {!loaded && !busy && (
        <Button
          title="Reintentar cargar recetas"
          secondary
          onPress={() => {
            void hydrate();
          }}
        />
      )}
      <Button
        title="Mis recetas"
        secondary
        onPress={() => router.push("/saved")}
      />
      <Button
        title="Cocinar otra cosa"
        secondary
        onPress={() => {
          useCookingStore.getState().clear();
          router.dismissAll();
          router.replace("/");
        }}
      />
    </Screen>
  );
}
