import { useState } from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Button, Mascot, Screen } from "../src/components/ui";
import { styles, theme } from "../src/theme";
import type { CookingComplexity } from "../src/types/recipe";
const options: { value: CookingComplexity; label: string }[] = [
  { value: "quick", label: "Rápido" },
  { value: "normal", label: "Normal" },
  { value: "elaborate", label: "Elaborado" },
];
export default function Home() {
  const [message, setMessage] = useState("");
  const [complexity, setComplexity] = useState<CookingComplexity>("normal");
  return (
    <Screen>
      <Text style={styles.eyebrow}>UN POCO DE AYUDA. MUCHO SABOR.</Text>
      <Mascot />
      <Text style={styles.title}>¿Qué quieres cocinar hoy?</Text>
      <Text style={styles.body}>
        Tú pones la idea. Eggy te acompaña paso a paso.
      </Text>
      <TextInput
        accessibilityLabel="Plato o ingredientes"
        style={styles.input}
        multiline
        maxLength={1000}
        value={message}
        onChangeText={setMessage}
        placeholder="Escribe un plato o los ingredientes que tienes..."
        placeholderTextColor={theme.colors.faint}
      />
      <View style={{ gap: 10 }}>
        <Text style={styles.muted}>¿Cuánto quieres dedicarle?</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: complexity === option.value }}
              onPress={() => setComplexity(option.value)}
              style={{
                flex: 1,
                paddingVertical: 14,
                minHeight: 48,
                alignItems: "center",
                borderWidth: 2,
                borderColor: theme.colors.ink,
                borderRadius: 12,
                backgroundColor:
                  complexity === option.value
                    ? theme.colors.mustard
                    : theme.colors.paper,
              }}
            >
              <Text style={{ color: theme.colors.ink, fontWeight: "700" }}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Button
        title="Buscar ideas"
        disabled={!message.trim()}
        onPress={() =>
          router.push({
            pathname: "/recipes",
            params: { message: message.trim(), complexity },
          })
        }
      />
      <Button
        title="Mis recetas"
        secondary
        onPress={() => router.push("/saved")}
      />
      <Text style={{ ...styles.muted, textAlign: "center" }}>
        Una idea para empezar: pollo al horno con papas.
      </Text>
    </Screen>
  );
}
