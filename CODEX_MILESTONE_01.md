# Eggy --- Codex Milestone 1 Prompt

You are building the first functional milestone of **Eggy**, a mobile AI
cooking assistant.

Before writing code, read `EGGY_CONTEXT.md` completely. Treat it as the
product source of truth.

## Objective

Create the initial React Native application and implement the complete
mocked core cooking flow.

This milestone deliberately does **not** connect to a real AI API.

At the end, I should be able to run the app, primarily test it on an
iPhone, and also retain Android compatibility.

The working flow must be:

**Home → mocked recipe suggestions → choose recipe → ingredients →
cooking mode → timers → Ask Eggy mock → finish → save recipe → Mis
recetas → cook saved recipe again.**

## Step 0 --- Inspect first

If a project already exists in the repository:

1.  inspect the existing files;
2.  identify the current Expo/React Native configuration;
3.  preserve working configuration where reasonable;
4.  do not blindly recreate the project.

If the repository is empty, initialize an Expo + React Native +
TypeScript project suitable for iOS and Android.

Use current stable package choices compatible with the installed Expo
SDK.

Do not use deprecated packages if a supported Expo alternative exists.

## Core stack

Use:

-   React Native
-   Expo
-   TypeScript
-   Expo Router
-   Zustand
-   AsyncStorage

Add only dependencies that are justified.

Use strict TypeScript.

## Architecture

Create a clean, understandable structure along these lines, adapting it
if Expo Router conventions require it:

``` text
app/
  _layout.tsx
  index.tsx
  recipes/
  cook/
  saved/

src/
  components/
  theme/
  types/
  data/
  services/
  store/
  storage/
  utils/
```

Do not over-engineer this.

Keep UI components separate from data/services where it meaningfully
improves clarity.

## Theme and design system

Implement an original vintage 1930s rubber-hose cartoon-inspired visual
system.

Do not copy Cuphead artwork, characters, logos, screens, or assets.

Create reusable theme tokens for:

-   colors;
-   spacing;
-   border widths;
-   radii;
-   typography sizing;
-   shadows where appropriate.

Visual direction:

-   warm cream background;
-   near-black ink outlines;
-   muted vintage red;
-   mustard accent;
-   vintage green;
-   thick outlines;
-   slightly playful shapes;
-   readable typography;
-   large tactile buttons.

Do not sacrifice readability for visual styling.

For milestone 1, Eggy can be represented with an original simple
component/placeholder illustration: an egg-shaped character with
chef-hat cues using basic React Native shapes, text, or original local
assets created for the project.

Do not fetch copyrighted art.

## Home screen

Build a polished Home screen containing:

-   Eggy mascot;
-   heading: `¿Qué quieres cocinar hoy?`;
-   text input;
-   placeholder: `Escribe un plato o los ingredientes que tienes...`;
-   complexity selector:
    -   `Rápido`
    -   `Normal`
    -   `Elaborado`
-   `Normal` selected by default;
-   submit/send action;
-   access to `Mis recetas`.

The interaction should feel like a focused assistant, not a full generic
chat product.

When the user submits a request, call a mocked recipe suggestion
service.

Show a short loading state featuring Eggy.

Then display 2--3 recipe suggestion cards.

## Mock suggestion service

Create a service abstraction that will later be replaceable by a real AI
implementation.

For now, return mock suggestions.

At minimum support a polished demonstration around:

-   pollo al horno con papas.

It is also useful to include mock recipes such as:

-   pasta con salsa de tomate;
-   tortilla de papas;
-   arroz con pollo.

The UI must not directly import hard-coded recipe data if a
service/repository abstraction is more appropriate.

## Recipe suggestion cards

Each suggestion displays:

-   title;
-   short description;
-   total time;
-   difficulty;
-   `Elegir` action.

Selecting a suggestion opens/generates the corresponding full mocked
recipe and navigates to recipe detail.

## Recipe detail / ingredients

Display:

-   title;
-   description;
-   servings;
-   prep/cook/total time where useful;
-   difficulty;
-   complete ingredient list;
-   ingredient checkboxes;
-   servings decrement/increment controls;
-   prominent `¡A cocinar!` button.

Implement local ingredient scaling.

Keep the original recipe servings as the scaling baseline.

Only scale ingredients where `scalable === true` and
`quantity !== null`.

Avoid cumulative floating-point scaling errors when the user repeatedly
changes servings.

Format quantities cleanly for human reading.

Do not mutate the canonical recipe object just to render scaled
quantities.

## TypeScript models

Create explicit types based on `EGGY_CONTEXT.md`.

At minimum include:

-   Recipe;
-   Ingredient;
-   CookingStep;
-   CookingTimerDefinition;
-   runtime timer state;
-   recipe suggestion;
-   cooking complexity.

Keep immutable recipe definitions separate from mutable runtime timer
state.

## Cooking mode

Implement a dedicated cooking experience.

Requirements:

-   step progress such as `PASO 3 DE 8`;
-   very large instruction text;
-   optional smaller tips;
-   Previous button;
-   Next button;
-   obvious final-step completion action;
-   `Preguntar a Eggy`;
-   minimal clutter;
-   maintain screen awake while this mode is active;
-   restore normal device behavior after leaving cooking mode.

A user should be able to read the primary instruction with the phone
sitting on a kitchen counter.

## Timers

If the current step defines a timer, render a timer card/control.

Implement:

-   countdown display;
-   Start;
-   Pause;
-   Resume;
-   Reset;
-   correct zero state;
-   more than one timer definition per step in the data model.

Important:

A running timer must continue when the user navigates from one cooking
step to another.

Do not make timer state local only to the rendered step component.

Use timestamps or another robust approach so countdowns do not
significantly drift if renders are delayed.

For milestone 1, reliable foreground behavior is sufficient.

Design the timer service/store so local notifications/background
improvements can be added in a later milestone.

## Ask Eggy

From cooking mode, tapping `Preguntar a Eggy` should open a bottom
sheet, modal, or similarly lightweight overlay.

The user can type a cooking question.

Use a mocked Ask Eggy service.

The mock service should receive an object representing:

-   user question;
-   current recipe;
-   current step;
-   active timer information if relevant.

Return a concise neutral-Spanish response.

Example question:

`El pollo se está dorando demasiado rápido. ¿Qué hago?`

Example response:

`Baja un poco la temperatura del horno. Si la superficie ya está bien dorada, puedes cubrir el pollo suavemente con papel aluminio y continuar la cocción.`

Closing the overlay must return the user to the exact same cooking step.

Structure the service so it can later be replaced by an API call without
rewriting the UI.

## Completion screen

After the final cooking step, show a polished completion screen.

Include:

-   Eggy celebration;
-   `¡Listo!`;
-   recipe completion message;
-   `Guardar receta` or saved state;
-   `Cocinar otra cosa`.

Saving must persist locally.

## Mis recetas

Implement local saved recipes with AsyncStorage.

The user can:

-   see saved recipes;
-   open a saved recipe;
-   inspect its ingredients;
-   cook it again;
-   remove it from saved recipes.

Persistence should survive application restart.

Create a small storage abstraction rather than spreading raw
AsyncStorage calls throughout UI components.

## State

Use Zustand for state that genuinely needs to be shared, such as:

-   current cooking session;
-   current step;
-   runtime timers;
-   saved recipe synchronization if appropriate.

Do not put every local UI boolean in global state.

## Accessibility and mobile behavior

Ensure:

-   large tap targets;
-   readable contrast;
-   accessibility labels for icon-only controls;
-   sensible keyboard behavior;
-   Safe Area handling;
-   scrolling on smaller devices;
-   no essential information hidden only by color;
-   layout works on typical iPhone and Android phone sizes.

## Language

All user-facing MVP copy should be in neutral Spanish.

Code identifiers, filenames, comments, and technical documentation
should be in English unless there is a strong reason otherwise.

## No real AI yet

Do not:

-   install an OpenAI SDK;
-   request API keys;
-   hard-code secrets;
-   build a production backend;
-   connect to an LLM.

Instead create interfaces such as:

-   recipe suggestion service;
-   full recipe service/repository;
-   Ask Eggy service.

Implement mocks behind those interfaces.

## Do not add

Do not implement:

-   login;
-   signup;
-   accounts;
-   Firebase;
-   Supabase;
-   cloud DB;
-   social/community features;
-   nutrition tracking;
-   subscriptions;
-   ads;
-   voice control;
-   camera scanning;
-   analytics;
-   preference memory.

## Quality checks

Before declaring the milestone complete:

1.  run TypeScript/type checking;
2.  run linting if configured;
3.  fix errors rather than suppressing them;
4.  verify navigation routes;
5.  verify ingredient scaling;
6.  verify timers continue across cooking steps;
7.  verify saved recipes persist;
8.  verify removing a saved recipe works;
9.  verify cooking a saved recipe works;
10. verify the app does not require a real API key.

If tests are already configured, add useful tests for pure logic such as
ingredient scaling and timer utilities.

Do not introduce a heavy testing framework solely for this milestone
unless justified.

## Documentation

Create/update `README.md` with:

-   what Eggy is;
-   stack;
-   prerequisites;
-   install command;
-   how to run iOS;
-   how to run Android;
-   how mock AI services are structured;
-   where future real AI integration should go;
-   known limitations of milestone 1.

Also add a short `docs/ARCHITECTURE.md` explaining:

-   routing;
-   state;
-   storage;
-   service abstraction;
-   recipe model;
-   timer design;
-   future AI integration boundary.

## Work style

Do not stop after generating a plan.

After inspecting the repository, implement the milestone.

Make reasonable decisions independently when details are unspecified,
while respecting `EGGY_CONTEXT.md`.

Prefer a complete, working vertical slice over many unfinished
abstractions.

If you encounter an environment limitation that prevents running
iOS/Android itself, still complete the code and run every validation
that is available in the environment.

At the end, provide:

1.  a concise summary of what you built;
2.  the important files created/changed;
3.  commands to run the app;
4.  validation results;
5.  any limitations or recommended next milestone.

The recommended next milestone should be connecting the three AI service
boundaries securely, not expanding the product with unrelated features.
