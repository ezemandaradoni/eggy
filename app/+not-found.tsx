import { router } from "expo-router";
import { Text } from "react-native";
import { Button, Screen } from "../src/components/ui";
import { styles } from "../src/theme";
export default function NotFound() {
  return (
    <Screen>
      <Text style={styles.title}>No encontramos esta página.</Text>
      <Button title="Volver al inicio" onPress={() => router.replace("/")} />
    </Screen>
  );
}
