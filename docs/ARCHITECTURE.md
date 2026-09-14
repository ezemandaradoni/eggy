# Architecture

## Routing and UI

Expo Router owns the stack in `app/_layout.tsx`. `/` is Home, `/recipes` loads suggestions, `/recipes/[id]` renders ingredients, `/cook` hosts the current step, `/cook/complete` saves the result, and `/saved` lists local recipes. A fallback route handles invalid links. Cooking replaces its route on completion so returning cannot accidentally resume the completed step. Exit confirms discarding the session. Ask Eggy is a native modal over the cooking screen and never changes its route or step index.

Theme tokens and original shape-based mascot components live under `src/theme` and `src/components`. Screens use safe areas, scrollable content, keyboard avoidance, accessible control roles, and large buttons. Ask Eggy stays outside the cooking scroll region, always available at the bottom. The cooking screen mounts Expo Keep Awake only while focused and releases it when leaving.

## Models and state

`src/types/recipe.ts` defines recipe, ingredient, step, timer definition, summary, complexity, and runtime timer types. Canonical recipes are treated as immutable. `scaledQuantity` always calculates from recipe.servings, scales only eligible quantities, and formats display values separately. It never writes scaled values back to a recipe.

The cooking Zustand store owns the recipe, selected servings, step index, and timer dictionary. Local form values, ingredient checks, loading states, and modal visibility stay in the UI. Starting any recipe creates a fresh session. Reloading a saved recipe resolves the full canonical recipe and uses the same cooking path.

## Timers

Each timer key combines step ID and timer ID; multiple timers per step are supported. Runtime state is separate from recipe definitions. A running timer stores an absolute `endsAt` timestamp. Remaining seconds are derived with a ceiling and clamped to zero. Pausing captures remaining seconds; resuming creates a new deadline; resetting restores the definition's duration.

A screen-level heartbeat refreshes the display and settles finished states. It also refreshes when AppState becomes active. Timers continue across steps and while the Ask modal is open. Started timers remain visible with their originating step labels. No interval decrements a stored counter, so delayed rendering does not accumulate drift. Future notification scheduling can attach to store start/pause/reset transitions using the same deadlines; it should not be attached to individual timer cards.

## Storage

`src/storage/recipes.ts` is the only AsyncStorage adapter, using a versioned key. `createSavedStore` accepts the storage interface so persistence behavior can be tested without native modules. Hydration finishes before mutations are enabled. Writes are serialized by a busy guard; UI state changes only after successful persistence. Save deduplicates by recipe ID; remove persists the filtered list. Errors remain visible and failed writes do not claim success.

## Services and future AI boundary

`CookingService` has three async operations for the future AI boundary: suggest, generate, ask. Suggestions return summaries without full ingredients/steps. Only a selected candidate requests generation. The repository caches that generated result, checks saved recipes, and falls back to the mock catalog by ID.

Ask receives the full canonical recipe, selected servings, current/previous/upcoming steps, question, and current active timer snapshots. Its rule-based mock demonstrates contextual assistance without network access.

Replace the implementation with a backend client in the next milestone. Add runtime schema validation for all external outputs and keep provider SDKs/secrets on the server. The screens should continue using these service/repository contracts. Do not add direct provider calls to components.
