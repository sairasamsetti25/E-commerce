# Carewell Health Dashboard

This repository contains the Carewell health and wellness dashboard prototype.

The main project is inside [`health-dashboard/`](health-dashboard/). It is a buildless, beginner-friendly website that can be opened with a simple local web server.

## Start here

- [Open the Carewell project](health-dashboard/)
- [Read the beginner-friendly project README](health-dashboard/README.md)
- [Follow the step-by-step learning guide](health-dashboard/BEGINNER_GUIDE.md)
- [Open the working website preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/sairasamsetti25/E-commerce/main/health-dashboard/dist/index.html)

## What Carewell includes

- Personal profile setup with a personalized greeting
- BMI and estimated calorie targets
- Water glasses, goals, progress, and remaining amount
- Food search and calorie logging
- Open Food Facts and USDA FoodData Central integrations
- Sleep, movement, and evening-routine interactions
- Separate font and animation files
- Responsive and keyboard-friendly UI patterns
- Beginner-oriented documentation

## Repository structure

```
.
├── health-dashboard/  # Current Carewell product
│   ├── dist/          # Website files served by the browser
│   ├── design-system/ # Design and UX decisions
│   ├── README.md      # Project explanation
│   └── BEGINNER_GUIDE.md
├── assets/            # Legacy/reference assets
├── index.html         # Legacy/reference root demo
└── styles.css         # Legacy/reference root demo styles
```

If you are learning the project, start inside `health-dashboard/`. The root-level files are retained for reference and are not the current Carewell dashboard.

## Local setup

From the repository root:

```bash
cd health-dashboard
python3 -m http.server 4173 --directory dist
```

Then open [http://localhost:4173](http://localhost:4173).

For more detail, see the [Carewell README](health-dashboard/README.md).
