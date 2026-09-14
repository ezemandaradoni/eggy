import { Text, View } from "react-native";
import type { RuntimeTimer } from "../types/recipe";
import { useCookingStore } from "../store/cooking";
import { clock, remaining } from "../utils/timers";
import { styles, theme } from "../theme";
import { Button } from "./ui";
export function TimerCard({
  timer,
  now,
}: {
  timer: RuntimeTimer;
  now: number;
}) {
  const seconds = remaining(timer, now);
  const finished = seconds === 0;
  const control = useCookingStore((state) => state.control);
  return (
    <View
      style={{
        ...styles.card,
        borderColor: finished ? theme.colors.red : theme.colors.ink,
      }}
    >
      <Text style={styles.eyebrow}>
        PASO {timer.stepNumber} · {timer.label}
      </Text>
      <Text
        accessibilityLabel={`${timer.label}: ${clock(seconds)}`}
        style={{
          fontSize: 42,
          fontVariant: ["tabular-nums"],
          fontWeight: "800",
          color: theme.colors.ink,
        }}
      >
        {clock(seconds)}
      </Text>
      {finished && (
        <Text style={styles.body} accessibilityLiveRegion="polite">
          Tiempo cumplido. Revisa la cocción.
        </Text>
      )}
      <View style={styles.row}>
        {!finished && (
          <Button
            title={
              timer.status === "running"
                ? "Pausar"
                : timer.status === "paused"
                  ? "Reanudar"
                  : "Iniciar"
            }
            onPress={() =>
              control(timer.id, timer.status === "running" ? "pause" : "start")
            }
          />
        )}
        <Button
          title="Reiniciar"
          secondary
          onPress={() => control(timer.id, "reset")}
        />
      </View>
    </View>
  );
}
