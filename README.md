# Carewell Health Dashboard

This repository contains the Carewell health and wellness dashboard prototype.

The main project is inside [`health-dashboard/`](health-dashboard/). It is a buildless, beginner-friendly website that can be opened with a simple local web server.

## Start here

- [Open the Carewell project](health-dashboard/)
- [Read the beginner-friendly project README](health-dashboard/README.md)
- [Follow the step-by-step learning guide](health-dashboard/BEGINNER_GUIDE.md)
- [Open the working website preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/sairasamsetti25/Health-App/main/health-dashboard/dist/index.html)

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

## Clone and run locally

Install [Git](https://git-scm.com/downloads) and [Python 3](https://www.python.org/downloads/), then run:

```bash
git clone https://github.com/sairasamsetti25/Health-App.git
cd Health-App/health-dashboard
python3 -m http.server 4173 --directory dist
```

Open [http://localhost:4173](http://localhost:4173) in your browser. Stop the local server with `Ctrl+C`.

There is no `npm install` or build command for the current static prototype.

## Make a change

Create a branch before editing:

```bash
git checkout -b improve-dashboard
```

After testing your change locally:

```bash
git status
git add .
git commit -m "Describe the dashboard improvement"
git push -u origin improve-dashboard
```

Open a pull request on GitHub so the change can be reviewed before it is merged into `main`.

For more detail, see the [Carewell README](health-dashboard/README.md).
