import { useState } from "react";
import { Modal, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cookingService } from "../services/cookingService";
import { useCookingStore } from "../store/cooking";
import { styles, theme } from "../theme";
import { remaining } from "../utils/timers";
import { Button, ErrorMessage, Mascot, Screen } from "./ui";
export function AskEggy({ onClose }: { onClose(): void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function ask() {
    const { recipe, stepIndex, timers, servings } = useCookingStore.getState();
    const currentStep = recipe?.steps[stepIndex];
    if (!recipe || !currentStep || !question.trim()) return;
    setBusy(true);
    setError("");
    setAnswer("");
    try {
      setAnswer(
        await cookingService.ask({
          question: question.trim(),
          recipe,
          currentStep,
          previousSteps: recipe.steps.slice(0, stepIndex),
          upcomingSteps: recipe.steps.slice(stepIndex + 1),
          servings,
          activeTimers: Object.values(timers)
            .filter(
              (timer) => timer.status === "running" && remaining(timer) > 0,
            )
            .map((timer) => ({ ...timer, remainingSeconds: remaining(timer) })),
        }),
      );
    } catch {
      setError("No pudimos responder. Inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.cream }}
        edges={["top"]}
      >
        <Screen>
          <Button title="Volver al paso" secondary onPress={onClose} />
          <Mascot small />
          <Text style={styles.title}>Preguntar a Eggy</Text>
          <Text style={styles.body}>Cuéntame qué está pasando.</Text>
          <TextInput
            autoFocus
            accessibilityLabel="Tu pregunta de cocina"
            style={styles.input}
            multiline
            maxLength={1000}
            value={question}
            onChangeText={setQuestion}
            placeholder="¿Se está dorando demasiado rápido?"
            placeholderTextColor={theme.colors.faint}
          />
          <Button
            title={busy ? "Eggy está pensando…" : "Preguntar"}
            disabled={busy || !question.trim()}
            onPress={() => {
              void ask();
            }}
          />
          {answer ? (
            <Text
              style={{ ...styles.body, ...styles.card }}
              accessibilityLiveRegion="polite"
            >
              {answer}
            </Text>
          ) : null}
          {error ? <ErrorMessage message={error} /> : null}
        </Screen>
      </SafeAreaView>
    </Modal>
  );
}
