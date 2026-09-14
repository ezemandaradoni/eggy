# Milestone 01 validation

Validated in Linux with Node 24.21.0 and Expo SDK 57.

| Check | Result |
| --- | --- |
| Strict TypeScript | Passed (`npm run typecheck`) |
| Expo ESLint configuration | Passed (`npm run lint`) |
| Logic tests | 5 passed (`npm test`) |
| Expo dependency compatibility | Passed against the installed SDK dependency map (`npx expo install --check`; offline fallback) |
| Production bundles | iOS, Android, and web passed (`npx expo export --platform all`) |
| Browser vertical slice | Passed with Chromium at 390 × 844; also checked Home at 360 × 640 |
| Native device execution | Not available in this Linux environment; no iPhone or Android emulator connected |

The browser smoke test exercises request submission, recipe selection, quantity scaling/checking, starting cooking, starting a timer and moving to another step, pause/resume, Ask Eggy and returning to the same step, completion, saving, a page reload, opening and cooking the saved recipe, removal, and another reload confirming removal. It asserts no uncaught page errors. This tests AsyncStorage's browser adapter; native storage still needs an on-device restart check.

The smoke test caught an asynchronous wake-lock cleanup race, now fixed by awaiting acquisition before releasing the lock. It also caught an unsupported mascot glyph, replaced with original drawn shapes. Visual screenshots were inspected locally.

## Optional browser smoke test

Playwright is deliberately not a project dependency. Install it separately if you want to repeat this additional check:

```sh
npm install --prefix /tmp/eggy-browser playwright
/tmp/eggy-browser/node_modules/.bin/playwright install chromium
npx expo export --platform all
python3 -m http.server 8081 --directory dist
# In another terminal:
NODE_PATH=/tmp/eggy-browser/node_modules node tests/browser-smoke.cjs
```

Chromium requires its standard Linux system libraries. `EGGY_TEST_URL` can override the local preview URL. This optional browser test supplements the mobile tests; it does not emulate native wake locks or keyboards.

## On-device acceptance

Run the README demo on an iPhone and Android phone. Check keyboard dismissal/input scrolling, safe areas, accessibility text sizing, hardware back/exit behavior, and keeping the screen awake during cooking but restoring normal sleep afterward. Verify timer display after briefly backgrounding and returning. Save a recipe, force-close/reopen, cook it again, and remove it. Timer sessions themselves intentionally do not survive process termination.

## Dependency notes

`npm audit --omit=dev` reports 13 moderate findings in Expo's transitive dependency chains (`xcode`/`uuid` and Router's `query-string`/`decode-uri-component`), with no high or critical findings. npm's proposed automatic fixes downgrade Expo/Router to incompatible old major versions, so no forced downgrade was applied. Recheck these upstream dependencies before distribution. Some upstream tooling also emits deprecation notices; application code uses supported Expo APIs.
