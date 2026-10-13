# Beginner Guide: Learn Carewell Step by Step

This guide assumes you have never built a website before.

## Step 1: Open the project

Use the [Carewell preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/sairasamsetti25/E-commerce/main/health-dashboard/dist/index.html) first.

Click:

1. Profile
2. BMI & energy needs
3. +1 glass
4. Log water
5. Food log
6. Start plan
7. Settings

This gives you a picture of what the code is supposed to do.

## Step 2: Understand the three main files

The website is built from three basic technologies:

- `index.html`: words, buttons, forms, and sections
- `styles.css`: layout and visual design
- `app.js`: calculations and interactions

There are two supporting style files:

- `fonts.css`: font choices
- `animations.css`: movement and reduced-motion behavior

A useful mental model is:

```
HTML = what exists
CSS = what it looks like
JavaScript = what it does
```

## Step 3: Find one visible piece

Start with hydration.

1. Open `dist/index.html`.
2. Search for `hydration-card`.
3. Find the text `Hydration`.
4. Notice the IDs `water-glasses`, `water-percent`, and `water-remaining`.
5. Open `dist/app.js`.
6. Search for `updateDashboard`.
7. Find the code that updates those IDs.

The HTML gives the browser places to show values. JavaScript calculates and inserts the values.

## Step 4: Make a safe visual change

Open `dist/styles.css`. Near the top you will see color variables such as:

```css
--bg: #eef5fa;
--navy: #172631;
--lime: #d9ed72;
```

Change one color, save the file, and refresh the browser.

If the color does not change, make sure you edited the file inside `health-dashboard/dist`.

## Step 5: Change the fonts

Open `dist/fonts.css`.

The file defines:

```css
--font-body
--font-display
```

The body font is used for normal interface text. The display font is used for headings and large metric numbers.

This file is separate so the dashboard can get a completely different personality without rewriting the layout.

## Step 6: Change the animation

Open `dist/animations.css`.

The `.reveal` class controls the initial card entrance. The `@keyframes carewell-reveal` block describes the movement.

Try changing:

```css
--motion-enter-duration: 500ms;
```

to:

```css
--motion-enter-duration: 900ms;
```

Refresh the page and compare the entrance speed.

Do not remove reduced-motion support. Some users prefer or need less movement.

## Step 7: Understand saved data

The app stores demo values in your browser:

```js
localStorage
```

The key is:

```
carewell-demo-state-v1
```

This is not a real login. It is only a convenient way to keep the demo values after refreshing.

## Step 8: Understand the API

When someone searches for food, JavaScript sends a request to food-data services.

The app tries:

- Open Food Facts
- USDA FoodData Central

The response is converted into a simple object with a name, brand, calories, serving size, and macros. The page then renders the result as a button.

In production, private API keys should never be placed directly in browser code. A backend should call the API and safely return approved data to the browser.

## Step 9: Make a beginner contribution

Good first contributions include:

- Rename a card
- Add a starter food
- Change a color
- Improve helper text
- Add a new hydration quick button
- Add a new daily-focus option
- Improve mobile spacing

Before committing:

1. Test desktop width.
2. Test a narrow mobile width.
3. Try using only the keyboard.
4. Refresh and confirm saved values still work.
5. Run `node --check dist/app.js` if you changed JavaScript.

## Useful Git commands

```bash
git status
git diff
git add .
git commit -m "Describe the change"
git push
```

Use simple commit messages that explain the result, for example:

```
style: increase profile form spacing
feat: add quick hydration logging
docs: explain food search for beginners
```
