# Eggy --- Product & Technical Context

## 1. Product vision

Eggy is a mobile cooking assistant powered by AI.

The core experience is intentionally simple:

1.  The user tells Eggy what they want to cook, or which ingredients
    they have.
2.  Eggy proposes 2--3 concise recipe variants.
3.  The user chooses one.
4.  Eggy presents the complete ingredient list.
5.  The user taps **¡A cocinar!**
6.  The app enters a distraction-free cooking mode with one large
    instruction per screen.
7.  Steps can include built-in timers.
8.  At any moment the user can **Ask Eggy** a question about the current
    cooking situation.
9.  At the end, the recipe can be saved locally and cooked again later.

The MVP should feel polished, focused, playful, and extremely easy to
use while someone is physically cooking.

Do not add unrelated product features.

------------------------------------------------------------------------

## 2. Platforms and stack

Target platforms:

-   iOS
-   Android

Preferred stack:

-   React Native
-   Expo
-   TypeScript
-   Expo Router
-   Zustand for lightweight app state
-   AsyncStorage for local persistence

The first development milestone should NOT connect to a real AI API.

Use mock data so the complete product flow can be developed and tested
before adding AI.

The architecture should nevertheless make it easy to replace mock
services with real AI services later.

------------------------------------------------------------------------

## 3. Brand

### Name

**Eggy**

### Mascot

Eggy is a small animated egg wearing a chef hat.

Eggy is both:

-   the mascot of the application;
-   the visual personification of the AI cooking assistant.

Eggy can appear prominently on the home screen and more subtly while
cooking.

Examples of contextual mascot use:

-   greeting the user on Home;
-   reacting while recipe suggestions are loading;
-   holding or interacting with a clock when a timer is running;
-   appearing beside the "Ask Eggy" action;
-   celebrating when a recipe is completed.

For the initial implementation, placeholders or simple original
vector/shape-based illustrations are acceptable. Do not depend on
copyrighted third-party assets.

------------------------------------------------------------------------

## 4. Visual direction

The visual language should evoke original 1930s rubber-hose cartoons:

-   hand-drawn feeling;
-   thick ink outlines;
-   warm cream / aged-paper backgrounds;
-   muted vintage palette;
-   slightly imperfect shapes;
-   vintage diner/menu typography;
-   subtle film-grain feeling;
-   playful but readable animations.

Important:

The app may be inspired by the general visual era associated with games
such as Cuphead, but it must NOT copy Cuphead characters, logos,
illustrations, UI assets, or other protected artwork.

Create an original Eggy visual identity.

Suggested palette direction:

-   warm cream;
-   ink black;
-   muted red;
-   mustard yellow;
-   vintage green.

Accessibility and readability take priority over decoration.

The cooking screen must remain extremely clean.

------------------------------------------------------------------------

## 5. Eggy's personality

Eggy speaks in neutral Spanish.

Avoid country-specific slang and lunfardo.

Personality:

-   friendly;
-   calm;
-   competent;
-   encouraging;
-   concise;
-   confident without being arrogant;
-   similar to a supportive, good-natured team leader.

Eggy should not sound childish despite being a cartoon character.

Avoid excessive emojis, exclamation marks, jokes, or unnecessary
commentary.

Example tone:

> Perfecto. Vamos a hacerlo paso a paso.

> Corta las papas en trozos de tamaño parecido para que se cocinen de
> manera uniforme.

> Si el pollo se está pegando, baja un poco el fuego y espera unos
> segundos antes de moverlo.

> Muy bien. Mientras esto se cocina, podemos avanzar con el siguiente
> paso.

------------------------------------------------------------------------

## 6. Navigation

Keep navigation minimal.

Primary areas:

-   Home
-   Mis recetas

Conceptual flow:

Home → conversation/request → recipe suggestions → selected recipe →
ingredients → cooking mode → completion

Saved recipe flow:

Mis recetas → recipe detail → ingredients → cook again

Avoid a crowded navigation bar.

------------------------------------------------------------------------

## 7. Home

Home should immediately communicate the purpose of the app.

Primary content:

-   Eggy mascot;
-   "¿Qué quieres cocinar hoy?";
-   text input;
-   send action;
-   subtle complexity selector:
    -   Rápido
    -   Normal
    -   Elaborado

Default complexity: **Normal**.

Input placeholder:

> Escribe un plato o los ingredientes que tienes...

Example user requests:

-   "Quiero pollo al horno con papas."
-   "Algo rápido con pasta."
-   "Tengo huevos, cebolla y queso."

The interface should feel closer to a focused cooking assistant than a
generic chatbot.

------------------------------------------------------------------------

## 8. Recipe suggestions

The first AI operation in the future will only generate 2--3 summarized
recipe ideas.

It should NOT generate all recipes in full at this stage.

Each suggestion contains:

-   title;
-   short description;
-   approximate total time;
-   difficulty;
-   action to select it.

Example:

### Pollo al limón y romero

Pollo al horno con papas doradas, limón, ajo y romero.

60 min · Fácil

\[Elegir\]

Only after selection will the future AI service generate the full
structured recipe.

This two-stage design reduces latency, token usage, and unnecessary
generation.

For MVP milestone 1, suggestions are mocked.

------------------------------------------------------------------------

## 9. Recipe detail / ingredients

After selecting a recipe, show:

-   recipe title;
-   short description;
-   servings;
-   total time;
-   difficulty;
-   complete ingredient list;
-   servings control;
-   primary **¡A cocinar!** button.

Ingredients may be checkable so the user can mark what they already
have.

Serving controls:

-   decrement;
-   current number;
-   increment.

Ingredient quantities should scale locally when servings change.

Do NOT call AI again merely to scale ingredient quantities.

Ingredients must indicate whether they are scalable.

For example:

500 g potatoes for 2 servings → 1 kg for 4 servings.

But:

"salt to taste" remains "salt to taste".

------------------------------------------------------------------------

## 10. Cooking mode

This is the most important screen in the application.

Design it for a phone sitting on a kitchen counter and being read from
some distance.

Priorities:

-   very large instruction text;
-   one conceptual step at a time;
-   excellent contrast;
-   minimal visual clutter;
-   obvious next/previous controls;
-   progress indicator;
-   timer when relevant;
-   "Ask Eggy" always accessible.

Example:

PASO 3 DE 8

Corta las papas en trozos medianos.

Intenta que tengan un tamaño parecido para que se cocinen de manera
uniforme.

\[Anterior\] \[Siguiente\]

\[Preguntar a Eggy\]

The device screen should remain awake while cooking mode is active,
using an appropriate Expo-compatible mechanism.

Restore normal screen behavior when leaving cooking mode.

------------------------------------------------------------------------

## 11. Instructions vs tips

Recipe steps should separate the primary action from optional supporting
advice.

Example:

Instruction:

> Dora el pollo durante 4 minutos de cada lado.

Tip:

> Evita moverlo constantemente para que pueda formar una buena costra.

The instruction should receive strong visual hierarchy.

Tips should appear smaller and secondary.

This prevents walls of text while cooking.

------------------------------------------------------------------------

## 12. Timers

A cooking step may contain zero, one, or multiple timers.

Example:

> Cocina durante 20 minutos.

The structured recipe contains a timer duration in seconds.

The UI interprets that data and renders the timer controls.

The AI should never generate UI labels or button markup.

Expected timer functionality:

-   start;
-   pause;
-   resume;
-   reset where appropriate;
-   continue running while the user navigates to another recipe step;
-   clearly associate the timer with its recipe step;
-   eventually support local notifications/background behavior.

For the first milestone, prioritize reliable in-app timers and structure
the implementation so notifications can be added cleanly afterward.

Timer state should not live only inside an individual step component.

------------------------------------------------------------------------

## 13. Ask Eggy

While cooking, the user can tap **Preguntar a Eggy**.

This should open a lightweight overlay, sheet, or modal without
abandoning cooking mode.

Example question:

> El pollo se está dorando demasiado rápido. ¿Qué hago?

In the future, the AI service should receive relevant context:

-   full current recipe;
-   ingredients;
-   current step;
-   previous steps;
-   upcoming steps;
-   active timers when useful;
-   user's question.

Eggy then provides concise contextual help.

Example:

> Baja un poco la temperatura del horno. Si la superficie ya está bien
> dorada, puedes cubrir el pollo suavemente con papel aluminio y
> continuar la cocción.

Closing Ask Eggy returns immediately to the same cooking step.

For milestone 1, use mocked contextual responses.

------------------------------------------------------------------------

## 14. Completion

When the final step is completed:

-   show a small Eggy celebration;
-   indicate that the recipe is ready;
-   allow the user to save the recipe;
-   allow return to Home.

Example:

# ¡Listo!

Tu pollo al horno está terminado.

\[Guardar receta\]

\[Cocinar otra cosa\]

Avoid gamification systems, scores, streaks, XP, etc. in the MVP.

------------------------------------------------------------------------

## 15. Mis recetas

Recipes can be saved locally.

Mis recetas should allow the user to:

-   see saved recipes;
-   open one;
-   inspect ingredients;
-   start cooking it again;
-   remove it from saved recipes.

No account is required in V1.

Use AsyncStorage or an appropriate abstraction over it.

------------------------------------------------------------------------

## 16. Recipe data model

Use strongly typed TypeScript models.

A useful starting point:

``` ts
export type Difficulty = "easy" | "medium" | "hard";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  steps: CookingStep[];
  tags: string[];
  createdAt: string;
};

export type IngredientUnit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "unit"
  | "tbsp"
  | "tsp"
  | "cup"
  | null;

export type Ingredient = {
  id: string;
  name: string;
  quantity: number | null;
  unit: IngredientUnit;
  notes?: string;
  scalable: boolean;
};

export type CookingStep = {
  id: string;
  title?: string;
  instruction: string;
  timers?: CookingTimerDefinition[];
  tips?: string[];
  ingredientsUsed?: string[];
};

export type CookingTimerDefinition = {
  id: string;
  label: string;
  durationSeconds: number;
};
```

Runtime timer state should be modeled separately from immutable recipe
data.

Do not store mutable countdown state directly inside the recipe
definition.

------------------------------------------------------------------------

## 17. Future AI architecture

Do not implement the real provider in milestone 1, but design interfaces
around three future AI capabilities:

### A. Suggest recipes

Input:

-   user's message;
-   selected complexity;
-   potentially locale/preferences later.

Output:

2--3 summarized recipe candidates.

### B. Generate full recipe

Input:

-   selected candidate;
-   original user request;
-   servings;
-   potentially preferences.

Output:

strict structured recipe data matching an explicit schema.

### C. Ask Eggy

Input:

-   user question;
-   current recipe;
-   current cooking step;
-   relevant cooking state.

Output:

short contextual guidance.

Keep provider-specific SDK code outside screens/components.

Screens should call an application service/repository abstraction.

This allows mocks now and a secure backend later.

------------------------------------------------------------------------

## 18. AI/API security for future releases

Never ship a private AI API key directly inside the mobile app.

When real AI is added, production architecture should place provider
credentials on a backend/serverless service.

The mobile app should call that backend.

For local development, mocks should remain available.

------------------------------------------------------------------------

## 19. Food safety

When AI is implemented, recipe generation and Ask Eggy should prioritize
food safety.

Future system instructions should encourage:

-   safe internal temperatures where relevant;
-   avoidance of cross-contamination;
-   clear handling guidance for raw poultry/meat/eggs;
-   safe storage/reheating advice;
-   not confidently improvising when a food-safety answer is uncertain.

Do not overload normal recipe steps with warnings unless they are
relevant.

------------------------------------------------------------------------

## 20. Explicitly out of scope for MVP

Do NOT add these unless requested later:

-   authentication;
-   user accounts;
-   Firebase;
-   Supabase;
-   remote database;
-   cloud synchronization;
-   social features;
-   community;
-   following users;
-   recipe sharing network;
-   calorie tracking;
-   nutrition dashboard;
-   barcode scanning;
-   camera/fridge scanning;
-   grocery delivery;
-   payments;
-   subscriptions;
-   ads;
-   achievements;
-   streaks;
-   voice control;
-   voice assistant;
-   persistent preference memory;
-   analytics platforms.

Potential V2 features include voice control and remembered cooking
preferences.

------------------------------------------------------------------------

## 21. Development philosophy

Prefer:

-   simple architecture;
-   small reusable components;
-   strict TypeScript;
-   clear separation of UI, state, persistence, and services;
-   original assets;
-   accessibility;
-   predictable navigation;
-   polished core flow.

Avoid:

-   premature backend infrastructure;
-   excessive abstraction;
-   huge files;
-   unnecessary dependencies;
-   building every future feature now.

The MVP should optimize for this single question:

**Can a user go from "I want to cook X" to confidently cooking it step
by step with Eggy?**
