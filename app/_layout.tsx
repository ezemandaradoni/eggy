import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSavedStore } from "../src/store/saved";
import { theme } from "../src/theme";
export default function Layout() {
  const hydrate = useSavedStore((state) => state.hydrate);
  useEffect(() => {
    void hydrate();
  }, [hydrate]);
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.cream },
          headerTintColor: theme.colors.ink,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { backgroundColor: theme.colors.cream },
        }}
      >
        <Stack.Screen name="index" options={{ title: "EGGY" }} />
        <Stack.Screen
          name="recipes/index"
          options={{ title: "Para tu mesa" }}
        />
        <Stack.Screen name="recipes/[id]" options={{ title: "La receta" }} />
        <Stack.Screen
          name="cook/index"
          options={{
            title: "Paso a paso",
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="cook/complete"
          options={{
            title: "Buen provecho",
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="saved/index" options={{ title: "Mis recetas" }} />
      </Stack>
    </>
  );
}
