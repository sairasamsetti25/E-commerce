# Carewell Health Dashboard

Carewell is a responsive health and wellness dashboard prototype. It helps a member review daily habits at a glance—hydration, sleep, movement, and guided routines—through a calm, card-based interface.

This project is the first skeleton for a larger health product. It focuses on the user experience and front-end interaction model before connecting real accounts, devices, or clinical data.

> **Status:** Functional front-end prototype  
> **Branch:** `health-dashboard-skeleton`  
> **Live preview:** [Open the dashboard preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/sairasamsetti25/E-commerce/health-dashboard-skeleton/health-dashboard/dist/index.html)

## What this project demonstrates

- A responsive dashboard shell inspired by the supplied health-dashboard reference
- Clear visual hierarchy for daily health metrics
- Guided evening-routine flow with completion state
- Hydration logging with daily, weekly, and monthly views
- Sleep feedback flow
- Movement progress tracking
- Profile editing
- Notification, privacy, and settings controls
- Upgrade-plan selection flow
- Search filtering across dashboard cards
- Mobile navigation with overlay behavior
- Keyboard-accessible dialogs with focus trapping and focus restoration
- Visible focus states, skip navigation, reduced-motion support, and semantic controls
- Demo state persistence with `localStorage`

All values and copy are illustrative. This is not a medical device, diagnostic tool, or source of medical advice.

## Quick start

### Requirements

- Python 3 or another static file server
- A modern browser

### Run the dashboard

From this directory:

```bash
python3 -m http.server 4173 --directory dist
```

Open [http://localhost:4173](http://localhost:4173).

You can also use any static server, such as:

```bash
npx serve dist
```

There is no build step and no package installation required.

## Project structure

```
health-dashboard/
├── dist/
│   ├── index.html       # Page structure and accessible UI labels
│   ├── styles.css       # Responsive layout, theme, components, and states
│   └── app.js            # Interactions, modal flows, and local demo state
├── design-system/
│   └── carewell-health/
│       ├── MASTER.md    # Product-wide visual and UX rules
│       └── pages/
│           └── dashboard.md
└── README.md
```

The site is intentionally buildless so that a learner can open the files directly and understand how the interface works.

## How the code works

### HTML

`dist/index.html` defines the dashboard layout:

- Navigation rail and mobile navigation
- Header and search field
- Hero routine card
- Hydration, sleep, and movement cards
- Privacy note and modal dialog containers

Interactive controls use native buttons, links, form fields, and dialog semantics wherever possible.

### CSS

`dist/styles.css` contains:

- Carewell color tokens and spacing rules
- Responsive grid and mobile breakpoints
- Card, button, navigation, modal, and chart styling
- Hover, focus, active, disabled, and reduced-motion states

### JavaScript

`dist/app.js` is a small dependency-free controller. It:

1. Loads demo state from `localStorage`
2. Renders the current metrics and progress values
3. Opens and closes dialogs
4. Handles form submissions and updates
5. Filters dashboard content from search
6. Updates the hydration range controls
7. Saves changes back to `localStorage`

The local storage key is `carewell-demo-state-v1`. Clear it in browser storage to reset the demo.

## Interaction guide

| Area | Try this |
| --- | --- |
| Evening routine | Select **Start plan**, then mark the routine complete |
| Hydration | Select **Log water** and add a serving |
| Hydration range | Switch between **D**, **W**, and **M** |
| Sleep | Select **View details** and submit feedback |
| Movement | Select **Update progress** and change active days |
| Profile | Open the profile menu and edit the demo profile |
| Settings | Open settings to change privacy and notification preferences |
| Upgrade | Select **Upgrade** and choose a demo plan |
| Search | Search for terms such as “sleep”, “water”, or “movement” |
| Mobile layout | Resize the browser or use a narrow viewport |

## Design direction

The visual language is based on a soft, editorial health experience:

- Pale blue background for a calm canvas
- Blue gradient hero panels for energy and focus
- Warm lime accent for completion and positive feedback
- Large rounded cards for fast scanning
- High-contrast black actions for clear decisions
- Serif display typography paired with a clean sans-serif UI face

The detailed design rules are documented in [design-system/carewell-health/MASTER.md](design-system/carewell-health/MASTER.md).

## Accessibility notes

The prototype includes:

- Skip-to-content navigation
- Semantic headings and landmarks
- Keyboard-operable controls
- Visible focus indicators
- Focus trapping inside open dialogs
- Focus restoration to the control that opened a dialog
- Escape-to-close behavior
- Reduced-motion media-query support
- Labels and descriptions for form controls
- Responsive layouts that remain usable on small screens

Before production, run automated and manual checks with tools such as Lighthouse, axe, VoiceOver, NVDA, and keyboard-only navigation.

## Production work still needed

This repository currently uses local demo state only. A production version should add:

- Secure authentication and account recovery
- Server-side persistence and authorization
- Consent, privacy, retention, and deletion workflows
- Health-device and wearable integrations
- Data validation and audit logging
- Real charting and historical trend APIs
- Billing and subscription management
- Error, loading, and offline states
- Automated unit, integration, accessibility, and end-to-end tests
- Security and medical/legal review appropriate to the product claims

These follow-up items are tracked in the [Carewell Jira backlog](https://sairasamsetti25.atlassian.net/issues/?jql=project%20%3D%20SCRUM%20AND%20text%20~%20%22Carewell%22).

## Learning path for contributors

A useful way to explore the project:

1. Open `dist/index.html` and identify the main dashboard regions.
2. Read the design tokens and responsive rules in `dist/styles.css`.
3. Follow the event listeners and state helpers in `dist/app.js`.
4. Change one demo value, refresh the page, and observe `localStorage`.
5. Add a new metric card using the existing card patterns.
6. Add tests and real data only after the interaction model is clear.

## Contributing

Keep changes small and explain the user-facing behavior in the commit message. For UI changes:

- Check desktop and mobile widths
- Test keyboard navigation
- Test dialogs with Escape and focus return
- Verify that demo state still loads after refresh
- Avoid presenting illustrative values as medical guidance
- Update this README when setup or behavior changes

## License

No license has been declared yet. Treat this repository as all-rights-reserved unless the owner adds a license.


## Latest functional features

The dashboard now supports a first-run profile setup. The user can enter a display name, age, sex used for the estimate, height, weight, activity level, and daily focus. The first name is shown in the dashboard greeting, and the profile values are saved locally.

The profile powers a personal metrics view:

- BMI calculated from height and weight
- BMI category indicator
- Body surface area estimate
- BMR estimate
- Estimated calorie targets to lose, maintain, and gain weight
- Mifflin–St Jeor calculation with an activity multiplier

Hydration now includes a visible glasses count and goal. Each glass is represented as 250 ml, and the existing add/remove flow updates the daily total and progress bar.

The food tracker includes:

- Daily calorie total
- Searchable starter food catalog for offline use
- Live product search through the Open Food Facts API when network access is available
- Calories, brand, serving size, and basic macro values for search results
- One-click logging and removal of foods
- Progress against the estimated maintenance target

### Food-data sources

The prototype uses [Open Food Facts](https://openfoodfacts.github.io/openfoodfacts-server/api/) for client-side product search. It is an open product database, so coverage and nutrition accuracy can vary by product and country. The app keeps a small local starter catalog as a fallback.

For a production food tracker, use a server-side integration with a managed nutrition data provider or [USDA FoodData Central](https://fdc.nal.usda.gov/api-guide/) so API keys, rate limits, normalization, attribution, and data quality can be controlled securely. Never expose a private production API key in browser JavaScript.

### Important health-product limitations

BMI and calorie values are general estimates and can be inappropriate for children, pregnancy, athletes, eating-disorder recovery, or some medical conditions. The current UI is a learning prototype and must not be presented as medical guidance. Production release requires qualified clinical, privacy, security, and legal review.

