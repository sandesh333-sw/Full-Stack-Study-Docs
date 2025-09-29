# Web Dev Notes – HTML, CSS, JavaScript (Beginner → Advanced)

Single-file, exam-ready notes. Skimmable sections. Copy-paste snippets. No fluff.

---

## 1) HTML – Structure & Semantics

### 1.1 Boilerplate
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <meta name="description" content="Page description">
  <link rel="icon" href="favicon.ico">
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>...</main>
  <footer>...</footer>
</body>
</html>
```

### 1.2 Semantics
- Structure: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- Media & captions: `figure`, `figcaption`
- Text semantics: `strong`, `em`, `mark`, `small`, `del`, `ins`, `cite`, `abbr`, `time`
- Accessibility: Use correct landmarks; titles/labels; alt text for images

### 1.3 Links & Images
```html
<a href="#contact">Jump to contact</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External</a>
<img src="photo.jpg" alt="A scenic mountain" width="400" loading="lazy">
<picture>
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="Responsive image">
</picture>
```

### 1.4 Lists & Tables
```html
<ul><li>Item</li><li>Item</li></ul>
<ol><li>Step</li><li>Step</li></ol>

<table>
  <caption>Sales 2025</caption>
  <thead><tr><th>Q</th><th>Total</th></tr></thead>
  <tbody><tr><td>Q1</td><td>$10k</td></tr></tbody>
</table>
```

### 1.5 Forms (HTML5)
```html
<form action="/submit" method="post" novalidate>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label><input type="checkbox" name="agree" required> I agree</label>

  <label for="age">Age</label>
  <input id="age" type="number" min="0" max="120">

  <label for="date">Date</label>
  <input id="date" type="date">

  <button type="submit">Send</button>
</form>
```
Tips: Use `label` for every control; use proper `type`; use `required`, `pattern`, `min/max` for native validation.

### 1.6 Meta & SEO Basics
- Unique, descriptive `<title>` (50–60 chars)
- `<meta name="description">` (150–160 chars)
- Proper heading hierarchy: one `h1`, then `h2`…
- `alt` text for images; semantic HTML; performance matters

---

## 2) CSS – Layout & Design

### 2.1 Core Concepts
- Cascade, Specificity, Inheritance
- Specificity order: inline > id > class/attr/pseudo > element
- Reset & box sizing:
```css
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
```

### 2.2 Selectors & Pseudos
```css
/* Basic */
p { margin: 0 0 1rem; }
.card { border: 1px solid #e5e7eb; }
#app { min-height: 100vh; }

/* Attribute */
input[type="email"] { border-color: #60a5fa; }

/* Pseudo-class / -element */
a:hover { text-decoration: underline; }
button:focus { outline: 2px solid #f59e0b; outline-offset: 2px; }
p::first-line { font-weight: 600; }
```

### 2.3 Box Model & Spacing
```css
.container { padding: 16px; border: 1px solid #e5e7eb; margin: 16px auto; max-width: 960px; }
```
- Margin collapsing happens between vertical margins of blocks.

### 2.4 Colors, Fonts, Variables
```css
:root { --primary: #667eea; --text: #111827; }
body { color: var(--text); font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
.btn { background: var(--primary); color: #fff; }
```

### 2.5 Layout: Flexbox
```css
.row { display: flex; gap: 12px; align-items: center; justify-content: space-between; }
.col { flex: 1; }
```
Use when in one dimension (row or column) with alignment control.

### 2.6 Layout: Grid
```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.grid-areas {
  display: grid;
  grid-template:
    "hd hd" auto
    "sb ct" 1fr
    "ft ft" auto / 240px 1fr;
}
```
Use when you need two‑dimensional layout with explicit placement.

### 2.7 Responsive & Units
```css
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
```
- Prefer `%`, `rem`, `vh/vw` for scalable design. Use `clamp(min, preferred, max)`.
```css
.title { font-size: clamp(1.25rem, 1.5vw + 1rem, 2.25rem); }
```

### 2.8 Transitions & Animations
```css
.btn { transition: transform .2s ease, box-shadow .2s ease; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.1); }

.fade-in { animation: fade .4s ease; }
@keyframes fade { from { opacity: 0 } to { opacity: 1 } }
```

### 2.9 Common UI Snippets
```css
.card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; background: #fff; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #eef2ff; color: #3730a3; }
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
```

---

## 3) JavaScript – Language & DOM (ES6+)

### 3.1 Essentials
```js
const answer = 42;          // constant
let count = 0;              // mutable
const user = { id: 1 };
```
- Types: number, string, boolean, null, undefined, object, symbol, bigint.
- Truthy/falsy: `"", 0, null, undefined, NaN, false` are falsy.

### 3.2 Functions & This
```js
function sum(a, b) { return a + b; }
const mul = (a, b) => a * b;
const obj = {
  n: 1,
  inc() { this.n++; },     // method – has its own `this`
};
```

### 3.3 Arrays & Objects
```js
const nums = [1,2,3];
const doubled = nums.map(n => n*2);
const evens = nums.filter(n => n%2===0);
const total = nums.reduce((a,b) => a+b, 0);

const user = { id: 1, name: 'Ada' };
const copy = { ...user, role: 'admin' };
const { name } = user; // destructuring
```

### 3.4 Modules
```js
// lib.js
export const greet = (n) => `Hi, ${n}`;
// main.js
import { greet } from './lib.js';
```

### 3.5 DOM & Events
```js
const btn = document.querySelector('#btn');
const out = document.querySelector('#out');
btn.addEventListener('click', () => { out.textContent = 'Clicked!'; });
```
- Query: `querySelector`, `querySelectorAll`
- Create/insert: `document.createElement`, `append`, `before`, `innerHTML`
- Classes: `el.classList.add/remove/toggle`
- Attributes/style: `setAttribute`, `el.style.color = 'red'`

### 3.6 Forms & Validation
```js
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const email = data.get('email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Invalid email');
    return;
  }
  console.log(Object.fromEntries(data));
});
```

### 3.7 Fetch & Async/Await
```js
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
getUsers().then(console.log).catch(console.error);
```

### 3.8 Performance & Patterns
- Minimize DOM reflows; batch updates; use `DocumentFragment` for many inserts.
- Debounce and throttle input/scroll events.
```js
const debounce=(fn, d=300)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d)}};
const throttle=(fn, d=300)=>{let t=0;return(...a)=>{const now=Date.now();if(now-t>=d){t=now;fn(...a)}}};
```
- Pure functions, immutability where possible. Prefer `map/filter/reduce`.

### 3.9 Error Handling
```js
try {
  // risky
} catch (err) {
  console.error(err.message);
} finally {
  // cleanup
}
```
- In async: wrap awaits in try/catch; surface actionable messages.

### 3.10 Useful Snippets
```js
// Copy to clipboard
async function copy(text){ await navigator.clipboard.writeText(text); }

// Query helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Deep clone (simple)
const clone = (obj) => JSON.parse(JSON.stringify(obj));
```

---

## 4) Projects to Practice (HTML/CSS/JS only)

- Todo App: add/complete/delete tasks, persist to `localStorage`.
- Calculator: keyboard input, error handling, expression parsing.
- Quiz App: timer, score, question bank, progress bar.
- Weather Widget: fetch API, loading/error states, unit toggle.
- Portfolio: sections, responsive nav, smooth scroll, accessible forms.

---

## 5) Debugging & Tools

- Browser DevTools: Elements (DOM/CSS), Console (logs/errors), Network (requests), Performance (profiling), Lighthouse (audits).
- Linters/Formatters: ESLint + Prettier for consistent JS style.
- Accessibility check: Tab through, color contrast, aria-live for dynamic updates.

---

## 6) Checklists

### HTML
- One `h1` per page; logical headings.
- Semantic containers; alt text; labels for inputs.
- Meta title/description; language attr on `<html>`.

### CSS
- Use variables; responsive units; mobile-first media queries.
- Avoid `!important`; keep specificity low; utility classes where helpful.
- Test in light/dark backgrounds; focus styles visible.

### JS
- Guard clauses first; meaningful names; small functions.
- Don’t block main thread; handle errors; validate inputs.
- Keep DOM manipulation minimal; detach/attach in batches.

---

## 7) Roadmap (HTML/CSS/JS Only)

1. HTML semantics → forms → media → accessibility
2. CSS selectors → box model → flex/grid → responsive → animations
3. JS basics → DOM/events → fetch/async → patterns → performance
4. Build 3–5 small projects; iterate on code quality and UX.

---

Keep shipping. 🚀
