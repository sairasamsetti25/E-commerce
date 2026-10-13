# Carewell Health Dashboard

An initial static dashboard skeleton for a health and wellness product. The visual direction is inspired by the supplied dashboard reference: a calm pale-blue canvas, strong card hierarchy, a compact navigation rail, and glanceable health metrics.

## Run locally

Because this is a buildless static site, serve the `dist/` directory with any static server, for example:

```bash
python3 -m http.server 4173 --directory dist
```

Then open <http://localhost:4173>.

## Current scope

- Responsive dashboard shell with collapsible mobile navigation
- Hero card for a guided activity with a completable routine flow
- Hydration, sleep, and movement metric cards with working demo controls
- Search, time-range controls, profile editing, privacy settings, notifications, and upgrade selection
- Accessible dialogs with focus return, keyboard focus trapping, visible focus states, and reduced-motion handling
- Local persistence through `localStorage` so demo changes survive a refresh
- Separate `fonts.css` and `animations.css` files so typography and motion can evolve independently from layout

The metrics and copy are illustrative placeholders, not medical advice or clinical claims. Real authentication, health-device integrations, billing, and secure server-side storage are separate production workstreams.



## Project map

```
health-dashboard/
├── dist/
│   ├── index.html       # Semantic dashboard markup and dialogs
│   ├── styles.css       # Layout, component visuals, responsive rules
│   ├── fonts.css        # Font loading and typography roles
│   ├── animations.css   # Entrance motion, timing, and reduced-motion rules
│   └── app.js           # State, calculations, API calls, and interactions
├── design-system/
│   └── carewell-health/ # Product visual and UX guidance
└── README.md
```

The site is intentionally buildless: a learner can open the files directly, serve `dist/`, and follow the behavior without a framework or package installation.

## Functional flows

### Profile and personal metrics

On a fresh visit, the profile dialog opens. The user can save a display name, age, sex used for the estimate, height, weight, activity level, and daily focus. The first name appears in the greeting.

The BMI view calculates:

- BMI and a category indicator
- Body surface area estimate
- Basal metabolic rate
- Estimated calories to lose, maintain, or gain weight

These values use the Mifflin–St Jeor equation and general estimates only.

### Hydration

The hydration card shows the current water amount, glasses completed, glasses goal, progress, and daily/weekly/monthly range controls. One glass is represented as 250 ml in this prototype.

### Food tracker

The food tracker supports:

- Daily calorie total
- Starter foods that work without an API connection
- Open Food Facts product search
- USDA FoodData Central search using `DEMO_KEY` by default
- Calories, serving size, brand, protein, carbohydrate, and fat values when available
- One-click logging and food removal
- Progress against the calculated maintenance target

Open Food Facts coverage and nutrition quality vary by product and country. USDA FoodData Central is a useful production source, but a production app should call it through a backend proxy. Never expose a private API key in browser JavaScript.

## Changing the visual direction

Typography and motion are intentionally independent from component layout:

- Edit `dist/fonts.css` to change font providers, font roles, and display/body pairings.
- Edit `dist/animations.css` to change entrance timing, easing, stagger delays, or reduced-motion behavior.
- Edit `dist/styles.css` for layout, cards, colors, breakpoints, and component structure.

This allows the product to take inspiration from a reference without being locked to the reference's exact fonts or animation language.

## API notes

Current browser integrations:

- [Open Food Facts API](https://openfoodfacts.github.io/openfoodfacts-server/api/)
- [USDA FoodData Central API](https://fdc.nal.usda.gov/api-guide/)

For production, add server-side caching, rate-limit handling, source attribution, normalization, error states, loading states, and secure key management.

## Health and safety boundary

This is a learning prototype, not a medical device or source of medical advice. BMI and calorie estimates may be inappropriate for children, pregnancy, athletes, eating-disorder recovery, or some medical conditions. Production release requires qualified clinical, privacy, security, and legal review.
