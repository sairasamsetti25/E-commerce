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
- Hero card for a guided activity
- Hydration, sleep, energy, and movement metric cards
- Search, time-range controls, and toast feedback as interaction placeholders
- Accessibility-minded focus states and reduced-motion handling

The metrics and copy are illustrative placeholders, not medical advice or clinical claims.
