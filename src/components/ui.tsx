import type { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.cream }}
      edges={["bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 24,
            gap: 22,
            width: "100%",
            maxWidth: 640,
            alignSelf: "center",
            flexGrow: 1,
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
  label,
}: {
  title: string;
  onPress(): void;
  secondary?: boolean;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label ?? title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 52,
        paddingHorizontal: 18,
        paddingVertical: 13,
        borderWidth: 2,
        borderColor: theme.colors.ink,
        borderRadius: theme.radii.button,
        backgroundColor: secondary ? theme.colors.paper : theme.colors.green,
        opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Text
        style={{
          fontWeight: "700",
          fontSize: 17,
          color: secondary ? theme.colors.ink : theme.colors.paper,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
export function Loading({
  text = "Eggy está preparando todo…",
}: {
  text?: string;
}) {
  return (
    <View style={{ alignItems: "center", gap: 16, padding: 20 }}>
      <Mascot small />
      <ActivityIndicator color={theme.colors.green} />
      <Text style={styles.body} accessibilityLiveRegion="polite">
        {text}
      </Text>
    </View>
  );
}
export function ErrorMessage({ message }: { message: string }) {
  return (
    <Text
      accessibilityRole="alert"
      style={{ ...styles.body, color: theme.colors.red }}
    >
      {message}
    </Text>
  );
}
export function Mascot({
  small = false,
  celebrate = false,
}: {
  small?: boolean;
  celebrate?: boolean;
}) {
  return (
    <View
      accessible
      accessibilityLabel={
        celebrate
          ? "Eggy celebra con su gorro de chef"
          : "Eggy, un huevo con gorro de chef"
      }
      style={{
        alignSelf: "center",
        width: small ? 110 : 170,
        height: small ? 120 : 180,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: small ? 100 : 152,
          height: 18,
          borderRadius: 50,
          backgroundColor: theme.colors.mustard,
        }}
      />
      <View
        style={{
          width: small ? 75 : 112,
          height: small ? 90 : 133,
          borderWidth: 3,
          borderColor: theme.colors.ink,
          borderTopLeftRadius: 65,
          borderTopRightRadius: 65,
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
          backgroundColor: theme.colors.paper,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ rotate: celebrate ? "-9deg" : "5deg" }],
        }}
      >
        <View
          style={{ flexDirection: "row", gap: small ? 12 : 20, marginTop: 8 }}
        >
          {[0, 1].map((eye) => (
            <View
              key={eye}
              style={{
                width: small ? 10 : 15,
                height: small ? 15 : 22,
                borderRadius: 12,
                backgroundColor: theme.colors.ink,
              }}
            />
          ))}
        </View>
        <View
          style={{
            marginTop: 8,
            width: small ? 20 : 30,
            height: small ? 10 : 15,
            borderBottomWidth: 3,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: theme.colors.red,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: -20,
            width: small ? 65 : 90,
            height: small ? 32 : 44,
            borderWidth: 3,
            borderColor: theme.colors.ink,
            borderRadius: 16,
            backgroundColor: theme.colors.paper,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -12,
              left: 4,
              right: 4,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {[0, 1, 2].map((puff) => (
              <View
                key={puff}
                style={{
                  width: small ? 20 : 28,
                  height: small ? 20 : 28,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderBottomWidth: 0,
                  borderColor: theme.colors.ink,
                  backgroundColor: theme.colors.paper,
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
