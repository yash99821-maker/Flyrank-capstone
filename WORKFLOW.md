# WORKFLOW.md

## The Drill

I built the same settings form feature twice: once with a single vague prompt ("Add a settings form to my app") accepted as-is, and once with a precise prompt specifying fields, validation library, constraints, accessibility requirements, file locations, and a verification step (write tests, run them, fix failures). Each round ran in a fresh AI session on its own branch.

## What Differed

**Correctness.** Round 1 has zero validation — any string, including an invalid email, gets accepted and saved. The Save button is always enabled. Round 2 uses a Zod schema (`z.string().email()`) enforced through react-hook-form, so the Save button stays disabled (`isValid` from formState) until the email is actually valid, and inline errors appear under each field.

**A real AI mistake I caught.** Round 2's SettingsForm saves the selected theme to localStorage but never applies it. Round 1 had a `useEffect` that called `applyTheme(settings.theme)` on change; Round 2's `utils/settings.js` has no `applyTheme` function at all, and nothing calls it. My prompt asked for a theme *field* but never said the theme had to visibly change the page — so the AI implemented exactly what was asked, and the gap only showed up when I read both files side by side. It's a reminder that "no validation errors" and "tests passing" don't mean "feature complete" — the tests I asked for covered form validation, not the theme's visual effect, so they passed while this bug shipped.

**Accessibility.** Both rounds correctly pair every `<label>` with `htmlFor`/`id`. Round 2 adds `role="alert"` on error messages so screen readers announce them, which Round 1 has no equivalent of (it has no errors to announce). Neither round links the error text to its input via `aria-describedby`, so a screen reader user gets the alert but not necessarily a bound relationship to the field it concerns — a gap in both.

**Edge cases.** Round 1 lets `displayName` and `email` be submitted empty or malformed with no feedback. Round 2 requires a non-empty, valid-format email before Save is even clickable, but doesn't enforce a minimum length on `displayName`, so an empty name still saves silently — an intentional gap since I never specified that constraint.

**Regression.** Round 1 shows a "Settings saved!" confirmation message after submit. Round 2 dropped this entirely — I never asked for it, and the AI didn't carry it over from nowhere (fresh session), so a small piece of UX quietly disappeared.

## Review Effort

Round 1's prompt took seconds to write, but the output needed a full validation and accessibility pass before it could ship — none of which I actually did, since the assignment required accepting it as-is. Round 2's prompt took a few minutes to write carefully, but its own test suite (3 tests, all passing) caught the validation logic working correctly before I even opened the browser. Round 2 felt slower while prompting and faster overall, because verification was built into the request instead of left for me to discover later.