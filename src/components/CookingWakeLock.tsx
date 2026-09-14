import { useEffect, useId } from "react";
import {
  activateKeepAwakeAsync,
  deactivateKeepAwake,
  isAvailableAsync,
} from "expo-keep-awake";

export function CookingWakeLock() {
  const tag = useId();
  useEffect(() => {
    // Wait for acquisition before release, even if the route leaves immediately.
    const acquisition = isAvailableAsync()
      .then(async (available) => {
        if (!available) return false;
        await activateKeepAwakeAsync(tag);
        return true;
      })
      .catch((error) => {
        console.warn("Cooking wake lock could not be acquired", error);
        return false;
      });
    return () => {
      void acquisition
        .then(async (acquired) => {
          if (acquired) await deactivateKeepAwake(tag);
        })
        .catch((error) =>
          console.warn("Cooking wake lock could not be released", error),
        );
    };
  }, [tag]);
  return null;
}
