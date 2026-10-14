# Carewell Health Dashboard

Carewell is a small health-dashboard website prototype. It lets a person:

- Create a personal profile
- See their first name in the dashboard greeting
- Calculate BMI and estimated calorie needs
- Track water glasses and the daily water goal
- Search for foods and log calories
- Review sleep, movement, and evening-routine cards

This project is designed to be easy to learn from. It does not use React, a database, or a build system. The browser can run the files directly through a simple local web server.

> **Important:** The health values in this project are examples and estimates. This is not medical advice or a medical device.

## Clone the repository

Install Git, then run:

```bash
git clone https://github.com/sairasamsetti25/E-commerce.git
cd E-commerce/health-dashboard
```

The `main` branch contains the current version of the Carewell dashboard.

## Open the website

### Easiest option: use the preview

[Open the working Carewell preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/sairasamsetti25/E-commerce/main/health-dashboard/dist/index.html)

The preview is useful for trying the interface. It is not a production deployment.

### Run it on your computer

From the `health-dashboard` folder, run:

```bash
python3 -m http.server 4173 --directory dist
```

Then open [http://localhost:4173](http://localhost:4173) in your browser.

There is no `npm install`, build command, or framework setup required.

## Beginner vocabulary

| Word | Meaning in this project |
| --- | --- |
| Website | The pages and controls you see in a browser |
| HTML | The content and structure of the page |
| CSS | The colors, spacing, fonts, layout, and visual style |
| JavaScript | The behavior when you click, type, or submit something |
| API | A service the website asks for information, such as food nutrition data |
| Local storage | Small data saved in your browser on your computer |
| Repository | The project folder stored on GitHub |
| Branch | A separate version of the project |
| Commit | A saved change in Git |

## Project map

```
health-dashboard/
├── dist/
│   ├── index.html       # Page content and interactive controls
│   ├── styles.css       # Layout, colors, cards, and responsive design
│   ├── fonts.css        # Font loading and typography choices
│   ├── animations.css   # Motion and reduced-motion behavior
│   └── app.js           # Calculations, state, clicks, forms, and APIs
├── design-system/
│   └── carewell-health/ # Design decisions and UX guidance
├── README.md            # This overview
└── BEGINNER_GUIDE.md   # Step-by-step learning guide
```

## How the website works

### 1. The page starts with HTML

Open `dist/index.html` to find:

- The left navigation
- The greeting at the top
- The hydration card
- BMI and food-tracker cards
- Dialogs for profile, hydration, BMI, and food search

HTML answers the question: “What exists on the page?”

### 2. CSS makes it look like a product

Open `dist/styles.css` to change:

- Card sizes
- Colors
- Spacing
- Buttons
- Responsive layouts
- Mobile behavior

Typography is in `dist/fonts.css`, and motion is in `dist/animations.css`. Keeping these separate makes it easier to try a different visual style without changing the app logic.

### 3. JavaScript makes it interactive

Open `dist/app.js` to find:

- Profile saving
- BMI and calorie calculations
- Water logging
- Food searching and logging
- Modal dialogs
- Search filtering
- Local browser persistence

JavaScript answers the question: “What should happen after someone interacts with the page?”

## Try the main features

### Create a profile

On a fresh visit, the profile window opens automatically. Enter:

- Name
- Age
- Sex used for the estimate
- Height
- Weight
- Activity level
- Daily focus

After saving, the first name appears in the greeting and the health estimates update.

### Calculate BMI and calories

Open the **BMI & energy needs** card. The dashboard calculates:

- BMI
- BMI category
- Body surface area estimate
- Basal metabolic rate
- Estimated calories to lose, maintain, and gain weight

These estimates use the Mifflin–St Jeor equation and are intended only for this learning prototype.

### Track water

The hydration card shows:

- Current liters
- Glasses completed
- Daily glasses goal
- Percentage completed
- Exact amount remaining

Use **+ 1 glass** or **+ 2 glasses** for quick logging. Use **Log water** for custom amounts or to change the daily goal.

### Track food

Open **Food log** and search for a food such as `oats`, `banana`, or `yogurt`.

Select a result to add it to today’s calorie total. Food can be removed from the log later.

The tracker uses:

- A small local starter catalog for offline fallback
- Open Food Facts for packaged-product search
- USDA FoodData Central for a second nutrition source

Live results require internet access. API availability and nutrition data quality can vary.

## Where data is saved

This prototype saves demo data in your browser using the storage key:

```
carewell-demo-state-v1
```

This means:

- Data stays on the same browser and device
- It is not a real account
- It is not shared with another device
- Clearing browser storage resets the demo

## Safe first changes to make

If you are learning, start with small changes:

1. Change the subtitle in `dist/index.html`.
2. Change a color variable near the top of `dist/styles.css`.
3. Change the font pair in `dist/fonts.css`.
4. Change the entrance timing in `dist/animations.css`.
5. Change a starter food in the `localFoods` list in `dist/app.js`.
6. Refresh the browser and see what changed.

Make one change at a time. If something breaks, undo the last change and try again.

## Common problems

### The page is blank

Make sure you opened the local server URL:

```
http://localhost:4173
```

Do not open `index.html` by double-clicking it when testing API requests. Browsers can block local files from making network requests.

### The food search does not return live results

Check your internet connection. The starter foods should still work. The live sources are Open Food Facts and USDA FoodData Central.

### The old profile keeps appearing

The browser is loading saved local data. Clear site storage for the preview or run this in the browser console:

```js
localStorage.removeItem('carewell-demo-state-v1');
location.reload();
```

### The mobile menu or dialog does not close

Refresh the page and test the Escape key. When editing JavaScript, check the browser console for errors.

## API and production notes

The browser currently calls:

- [Open Food Facts API](https://openfoodfacts.github.io/openfoodfacts-server/api/)
- [USDA FoodData Central API](https://fdc.nal.usda.gov/api-guide/)

USDA uses `DEMO_KEY` for this prototype. A production app must use a backend proxy for private keys, rate limits, caching, error handling, and data normalization.

A real product would also need secure authentication, a real database, consent and privacy controls, automated tests, and professional health/legal review.

## Learning order

If you are teaching this project, use this order:

1. Open the website and click every visible control.
2. Read the project map above.
3. Read the HTML and identify one card.
4. Read the CSS for that card.
5. Find the JavaScript event that runs when the card is clicked.
6. Change one label or color.
7. Add one small feature.
8. Commit the change with a clear message.

For a guided lesson, see [BEGINNER_GUIDE.md](BEGINNER_GUIDE.md).
