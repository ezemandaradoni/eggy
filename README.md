# Eggy

Eggy is a Spanish-language mobile cooking assistant. Milestone 01 implements the complete mocked flow: request → recipe ideas → ingredients → guided cooking → timers and Ask Eggy → completion → local saved recipes → cook again.

## Stack and prerequisites

Expo SDK 57, React Native, TypeScript (strict), Expo Router, Zustand, AsyncStorage, and Expo Keep Awake. Package versions are aligned with the installed Expo SDK; commit and use `package-lock.json` for reproducible installs.

Use Node.js 22.13+ (Node 24 LTS recommended), npm, and an iPhone or Android device with an Expo Go version supporting SDK 57. The computer and phone should share a network. An iOS simulator requires macOS/Xcode; an Android emulator requires Android Studio and a configured SDK.

```sh
npm ci
npm start
```

On iPhone, scan the terminal QR code with Camera and open Expo Go. On Android, scan it from Expo Go. No account, environment file, backend, or AI API key is needed for this local flow. If Expo Go's SDK version differs, use a matching development build or compatible Expo Go version; see [Expo's setup guide](https://docs.expo.dev/get-started/set-up-your-environment/).

```sh
npm run ios      # macOS: launch iOS Simulator
npm run android  # launch an Android emulator / connected device
npm run web      # optional browser preview
```

## Demo

1. Enter `Quiero pollo al horno con papas.` and select a complexity (Normal is the default).
2. Choose the lemon/rosemary chicken, paprika chicken, or tomato pasta. Quick requests and pasta requests place pasta first. Suggestions are a finite mock catalog, not generated interpretations of arbitrary requests.
3. Change servings and check ingredients. For the chicken, 500 g of potatoes at 2 servings becomes 1 kg at 4; salt stays “al gusto”.
4. Start cooking. At step 4, start the timer, advance a step, and observe the timer continuing with its original step label. Pause, resume, or reset it. The pasta demo also lets sauce and pasta timers overlap.
5. Open Preguntar a Eggy, ask `El pollo se está dorando demasiado rápido. ¿Qué hago?`, and return to the same step.
6. Finish and save. Open Mis recetas, reopen the recipe, and cook it again. Restart the app to check persistence; remove the recipe to delete it locally.

## Services and persistence

`src/services/cookingService.ts` defines the three AI capabilities: suggest summaries, generate a full recipe, and answer a contextual cooking question. Its mock implementation is asynchronous and deterministic. `recipeRepository.ts` retains generated recipes and resolves saved recipes. Screens never import the fixture catalog.

The next milestone should replace these three mocks with calls to a secure backend, validate structured recipe responses, and keep provider credentials on that backend. Do not embed private AI keys in Expo environment variables or mobile bundles.

AsyncStorage access lives in `src/storage/recipes.ts`. Only saved recipes persist; serving selection, checked ingredients, questions, and active cooking sessions are temporary. Saved recipes retain their canonical serving baseline.

## Validation

```sh
npm run typecheck
npm run lint
npm test
npx expo install --check
npx expo export --platform all
```

Tests use Node's built-in test runner through `tsx`, covering scaling, multi-timer transitions, late ticks, store reload/removal/re-cooking, failed storage writes, and mock service contracts. The storage tests inject a JSON-backed adapter; actual AsyncStorage restart behavior should also be smoke-tested on a device.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for implementation details and [docs/VALIDATION.md](docs/VALIDATION.md) for validation results and device checks.

## Milestone limitations

- Three mock recipes, no real AI or backend. Complexity affects ordering; it does not generate new recipes.
- Timers reliably compute elapsed time from timestamps while the session lives. No notifications, alarm sound, background execution guarantee, or session recovery after process termination. Exit/new cooking sessions reset timers.
- Screen wake behavior and native keyboard/safe-area behavior require on-device verification. Web is a preview, not the primary target.
- The original Eggy mascot uses basic shapes and text; no downloaded character artwork or custom fonts.
