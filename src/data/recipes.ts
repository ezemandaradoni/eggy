import type { Recipe } from "../types/recipe";
const chicken: Recipe = {
  id: "pollo-limon",
  title: "Pollo al limón y romero",
  description:
    "Pollo al horno, papas doradas y un toque de limón. Un clásico sin complicaciones.",
  servings: 2,
  prepTimeMinutes: 15,
  cookTimeMinutes: 45,
  totalTimeMinutes: 60,
  difficulty: "easy",
  tags: ["pollo", "horno"],
  createdAt: "2026-09-14T00:00:00.000Z",
  ingredients: [
    {
      id: "chicken",
      name: "Muslos de pollo",
      quantity: 2,
      unit: "unit",
      scalable: true,
    },
    { id: "potato", name: "Papas", quantity: 500, unit: "g", scalable: true },
    { id: "lemon", name: "Limón", quantity: 1, unit: "unit", scalable: true },
    {
      id: "garlic",
      name: "Dientes de ajo",
      quantity: 2,
      unit: "unit",
      scalable: true,
    },
    {
      id: "oil",
      name: "Aceite de oliva",
      quantity: 2,
      unit: "tbsp",
      scalable: true,
    },
    {
      id: "rosemary",
      name: "Romero",
      quantity: 1,
      unit: "tsp",
      scalable: true,
    },
    {
      id: "salt",
      name: "Sal y pimienta",
      quantity: null,
      unit: null,
      scalable: false,
      notes: "al gusto",
    },
  ],
  steps: [
    {
      id: "heat",
      instruction: "Precalienta el horno a 200 °C.",
      tips: [
        "Prepara una bandeja amplia para que los ingredientes no queden amontonados.",
      ],
    },
    {
      id: "potatoes",
      instruction: "Lava las papas y córtalas en trozos medianos.",
      tips: [
        "Haz trozos de tamaño parecido para que se cocinen de manera uniforme.",
      ],
      ingredientsUsed: ["potato"],
    },
    {
      id: "season",
      instruction:
        "Coloca el pollo y las papas en la bandeja. Añade el aceite, el ajo picado, el romero y el jugo de limón.",
      tips: [
        "Sazona con sal y pimienta. Lava las manos y los utensilios después de tocar el pollo crudo.",
      ],
    },
    {
      id: "roast",
      instruction: "Lleva la bandeja al horno y cocina durante 25 minutos.",
      tips: [
        "Puedes continuar al siguiente paso mientras corre el temporizador.",
      ],
      timers: [
        { id: "first-roast", label: "Primera cocción", durationSeconds: 1500 },
      ],
    },
    {
      id: "turn",
      instruction:
        "Cuando termine la primera cocción, gira las papas y hornea 20 minutos más.",
      tips: [
        "Si ya está muy dorado, cubre la bandeja suavemente con papel aluminio.",
      ],
      timers: [
        { id: "second-roast", label: "Segunda cocción", durationSeconds: 1200 },
      ],
    },
    {
      id: "check",
      instruction:
        "Comprueba que el pollo esté bien cocido y las papas tiernas.",
      tips: [
        "Un termómetro en la parte más gruesa del pollo, sin tocar el hueso, debe indicar al menos 74 °C. Si hace falta, continúa la cocción y vuelve a comprobar.",
      ],
    },
    {
      id: "rest",
      instruction: "Deja reposar el pollo 5 minutos y sirve con las papas.",
      timers: [{ id: "rest", label: "Reposo", durationSeconds: 300 }],
    },
  ],
};
const pasta: Recipe = {
  id: "pasta-tomate",
  title: "Pasta con salsa de tomate",
  description:
    "Tomate, ajo y albahaca para una pasta sencilla y reconfortante.",
  servings: 2,
  prepTimeMinutes: 5,
  cookTimeMinutes: 20,
  totalTimeMinutes: 25,
  difficulty: "easy",
  tags: ["pasta", "rápido"],
  createdAt: chicken.createdAt,
  ingredients: [
    {
      id: "pasta",
      name: "Pasta seca",
      quantity: 200,
      unit: "g",
      scalable: true,
    },
    {
      id: "tomato",
      name: "Tomate triturado",
      quantity: 400,
      unit: "g",
      scalable: true,
    },
    {
      id: "garlic",
      name: "Dientes de ajo",
      quantity: 2,
      unit: "unit",
      scalable: true,
    },
    {
      id: "oil",
      name: "Aceite de oliva",
      quantity: 1,
      unit: "tbsp",
      scalable: true,
    },
    {
      id: "basil",
      name: "Albahaca y sal",
      quantity: null,
      unit: null,
      scalable: false,
      notes: "al gusto",
    },
  ],
  steps: [
    {
      id: "boil",
      instruction: "Pon una olla con abundante agua a hervir. Pica el ajo.",
    },
    {
      id: "sauce",
      instruction:
        "Calienta el aceite, cocina el ajo brevemente y añade el tomate.",
      tips: ["Añade sal y cocina la salsa a fuego suave durante 15 minutos."],
      timers: [{ id: "sauce", label: "Salsa de tomate", durationSeconds: 900 }],
    },
    {
      id: "pasta",
      instruction: "Añade sal al agua y cocina la pasta según el envase.",
      tips: [
        "Estos 10 minutos son orientativos: sigue el tiempo del fabricante. Reserva un poco del agua de cocción.",
      ],
      timers: [
        { id: "pasta", label: "Pasta · orientativo", durationSeconds: 600 },
      ],
    },
    {
      id: "serve",
      instruction: "Escurre la pasta, mézclala con la salsa y añade albahaca.",
      tips: [
        "Si la salsa está muy espesa, añade un poco del agua de cocción. Sirve caliente.",
      ],
    },
  ],
};
const rustic: Recipe = {
  ...chicken,
  id: "pollo-pimenton",
  title: "Pollo al pimentón con papas",
  description: "Una versión cálida y aromática, con pimentón dulce y ajo.",
  ingredients: chicken.ingredients.map((i) =>
    i.id === "rosemary" ? { ...i, name: "Pimentón dulce" } : i,
  ),
  steps: chicken.steps.map((s) => ({
    ...s,
    instruction: s.instruction.replace("romero", "pimentón dulce"),
  })),
};
export const mockRecipes: Recipe[] = [chicken, rustic, pasta];
