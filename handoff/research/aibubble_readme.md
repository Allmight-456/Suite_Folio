# AI: A Quiet Warning

A static, single-page editorial site about AI stock valuations in May 2026 and the historical pattern of asset bubbles. Knowledge base, not investment advice.

[![AI: A Quiet Warning — site preview](./AI_Bubble.png)](https://allmight-456.github.io/AI_Bubble/)

Vision and content spec: see `ai_bubble_site_spec.md`.

## Run locally

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. No build step, no dependencies.

## Edit content

All copy lives in `content.js` as a single exported `CONTENT` object. Edit the strings — layout and styles will pick up the changes automatically on reload.

```js
// content.js
export const CONTENT = {
  meta: { ... },
  hero: { ... },
  sections: [ ... ],
  // ...
};
```

## Edit styles

All visual rules live in `styles.css`. Design tokens are defined in `:root` at the top of the file (Renaissance palette + the one neon `--alarm-pink`).

## Deploy

This is a pure-static site — drop the folder onto any host:

- **Netlify**: drag the folder into Netlify Drop, or `netlify deploy`.
- **Vercel**: `vercel` from the project root.
- **GitHub Pages**: push to a repo, enable Pages on the branch root.

Required files at the deploy root: `index.html`, `styles.css`, `app.js`, `content.js`, `assets/`.

## File tour

- `index.html` — Single document, seven empty `<section>` shells, mini-nav `<header>`, footer. Loads Inter + Instrument Serif + JetBrains Mono from Google Fonts. Boots `app.js` as a module.
- `styles.css` — Design tokens + all layout. Single breakpoint at `768px`. Includes print stylesheet.
- `app.js` — Vanilla ES module. Reads `CONTENT`, renders each section on `DOMContentLoaded`, sets up sticky mini-nav, IntersectionObserver for active section + number counters.
- `content.js` — Site copy.
- `BUILD_LOG.md` — One line per phase across the build.

## Accessibility

- Every interactive element is keyboard-reachable; `:focus-visible` shows a pink outline.
- `aria-current="location"` is set on the active section index item.
- Color contrast verified for pink-on-dark and pink-on-cream combinations.
- `prefers-reduced-motion` disables smooth scroll and the number-counter animation.

## Print

`Ctrl/Cmd+P` produces a grayscale-on-white version with page breaks before each section. Pink is demoted to a warm gray.
