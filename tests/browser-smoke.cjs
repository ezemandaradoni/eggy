const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const baseUrl = process.env.EGGY_TEST_URL ?? "http://127.0.0.1:8081";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(baseUrl);
  await page
    .getByRole("textbox", { name: "Plato o ingredientes" })
    .fill("Quiero pollo al horno con papas.");
  await page.getByRole("button", { name: "Buscar ideas", exact: true }).click();
  await page
    .getByRole("button", { name: "Elegir", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Aumentar porciones" }).click();
  await page.getByRole("button", { name: "Aumentar porciones" }).click();
  await page.getByRole("checkbox", { name: "Papas, 1 kg" }).click();
  await page.getByRole("button", { name: "¡A cocinar!" }).click();
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("button", { name: "Iniciar", exact: true }).click();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("button", { name: "Pausar", exact: true }).click();
  await page.getByRole("button", { name: "Reanudar", exact: true }).click();
  await page
    .getByRole("button", { name: "Preguntar a Eggy", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Tu pregunta de cocina" })
    .fill("El pollo se está dorando demasiado rápido");
  await page.getByRole("button", { name: "Preguntar", exact: true }).click();
  await page
    .getByText("Baja un poco la temperatura.", { exact: false })
    .waitFor();
  await page
    .getByRole("button", { name: "Volver al paso", exact: true })
    .click();
  await page.getByText("PASO 5 DE 7", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("button", { name: "Terminar", exact: true }).click();
  await page
    .getByRole("button", { name: "Guardar receta", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Receta guardada", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Mis recetas", exact: true }).click();
  // Load Home again without clearing browser storage, then open the saved collection.
  await page.goto(baseUrl);
  await page.getByRole("button", { name: "Mis recetas", exact: true }).click();
  await page.getByRole("button", { name: "Ver receta", exact: true }).click();
  await page.getByRole("button", { name: "¡A cocinar!" }).click();
  await page.getByText("PASO 1 DE 7", { exact: true }).waitFor();
  await page.goto(baseUrl);
  await page.getByRole("button", { name: "Mis recetas", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Eliminar Pollo al limón y romero",
      exact: true,
    })
    .click();
  await page
    .getByText("Todavía no hay recetas guardadas.", { exact: false })
    .waitFor();
  await page.goto(baseUrl);
  await page.getByRole("button", { name: "Mis recetas", exact: true }).click();
  await page
    .getByText("Todavía no hay recetas guardadas.", { exact: false })
    .waitFor();
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(baseUrl);
  await page
    .getByRole("button", { name: "Buscar ideas", exact: true })
    .scrollIntoViewIfNeeded();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: complete cooking flow, timer controls across steps, Ask context, saved reload/re-cook/removal, small viewport, no runtime errors",
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
