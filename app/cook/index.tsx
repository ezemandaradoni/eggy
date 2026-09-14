import { useCallback, useEffect, useState } from "react";
import { Alert, AppState, BackHandler, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { CookingWakeLock } from "../../src/components/CookingWakeLock";
import { SafeAreaView } from "react-native-safe-area-context";
import { AskEggy } from "../../src/components/AskEggy";
import { TimerCard } from "../../src/components/TimerCard";
import { Button, Screen } from "../../src/components/ui";
import { useCookingStore } from "../../src/store/cooking";
import { styles, theme } from "../../src/theme";
export default function Cooking() {
  const { recipe, servings, stepIndex, timers, move, tick, clear } =
    useCookingStore();
  const [asking, setAsking] = useState(false);
  const [focused, setFocused] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const leave = useCallback(
    () =>
      Alert.alert(
        "¿Salir de la cocina?",
        "Se cerrará esta sesión y se reiniciarán sus temporizadores.",
        [
          { text: "Seguir cocinando", style: "cancel" },
          {
            text: "Salir",
            style: "destructive",
            onPress: () => {
              clear();
              router.replace("/");
            },
          },
        ],
      ),
    [clear],
  );
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      const back = BackHandler.addEventListener("hardwareBackPress", () => {
        leave();
        return true;
      });
      return () => {
        setFocused(false);
        back.remove();
      };
    }, [leave]),
  );
  useEffect(() => {
    const update = () => {
      const time = Date.now();
      tick(time);
      setNow(time);
    };
    const interval = setInterval(update, 250);
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") update();
    });
    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [tick]);
  const step = recipe?.steps[stepIndex];
  if (!recipe || !step)
    return (
      <Screen>
        <Text style={styles.title}>Vamos a elegir una receta.</Text>
        <Button title="Ir al inicio" onPress={() => router.replace("/")} />
      </Screen>
    );
  const visibleTimers = Object.values(timers).filter(
    (timer) => timer.stepId === step.id || timer.status !== "idle",
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.cream }}
      edges={["top"]}
    >
      {focused && <CookingWakeLock />}
      <Screen>
        <View style={styles.row}>
          <Text style={{ ...styles.eyebrow, flex: 1 }}>
            PASO {stepIndex + 1} DE {recipe.steps.length}
          </Text>
          <Button title="Salir" secondary onPress={leave} />
        </View>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 1,
            max: recipe.steps.length,
            now: stepIndex + 1,
          }}
          style={{ height: 7, backgroundColor: "#D6CAB3", borderRadius: 4 }}
        >
          <View
            style={{
              width: `${((stepIndex + 1) / recipe.steps.length) * 100}%`,
              height: 7,
              backgroundColor: theme.colors.green,
              borderRadius: 4,
            }}
          />
        </View>
        <Text style={styles.muted}>
          {recipe.title} · {servings} porciones
        </Text>
        <Text
          style={{
            color: theme.colors.ink,
            fontSize: theme.type.instruction,
            lineHeight: 44,
            fontWeight: "800",
          }}
          accessibilityLiveRegion="polite"
        >
          {step.instruction}
        </Text>
        {step.tips?.map((tip) => (
          <Text key={tip} style={styles.body}>
            {tip}
          </Text>
        ))}
        {visibleTimers.map((timer) => (
          <TimerCard key={timer.id} timer={timer} now={now} />
        ))}
        <View style={{ ...styles.row, marginTop: "auto" }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Anterior"
              secondary
              disabled={stepIndex === 0}
              onPress={() => move(stepIndex - 1)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title={
                stepIndex === recipe.steps.length - 1 ? "Terminar" : "Siguiente"
              }
              onPress={() => {
                if (stepIndex === recipe.steps.length - 1)
                  router.replace("/cook/complete");
                else move(stepIndex + 1);
              }}
            />
          </View>
        </View>
      </Screen>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          paddingHorizontal: 24,
          paddingTop: 10,
          backgroundColor: theme.colors.cream,
        }}
      >
        <Button
          title="Preguntar a Eggy"
          secondary
          onPress={() => setAsking(true)}
        />
      </SafeAreaView>
      {asking && <AskEggy onClose={() => setAsking(false)} />}
    </SafeAreaView>
  );
}
