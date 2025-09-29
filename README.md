# Web Dev Notes – HTML, CSS, JavaScript, Node.js, React, CI/CD, Kubernetes

A single-file notes hub you can skim fast or study deep. Copy-paste friendly examples. Minimal fluff.

---

## 1) HTML Notes

- **HTML = Structure** of the web page. Use semantic tags for meaning and accessibility.
- **Boilerplate**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <meta name="description" content="Short page description">
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>
```
- **Semantics**: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `figcaption`, `time`, `mark`.
- **Links & Images**:
```html
<a href="#id">Jump</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">External</a>
<img src="img.png" alt="Description" width="300">
```
- **Forms (HTML5)**:
```html
<form action="/submit" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>
  <input type="number" min="0" max="100">
  <input type="date">
  <button type="submit">Send</button>
</form>
```
- **Tables**: Use for data (not layout). `thead`, `tbody`, `th`, `td`, `caption`.
- **Accessibility**: Alt text, labels, focus order, semantic tags, `aria-*` only when needed.

---

## 2) CSS Notes

- **CSS = Presentation** (style/layout). Cascade + Specificity + Inheritance.
- **Selectors**: element `p`, class `.card`, id `#app`, attribute `[type="email"]`, pseudo `:hover`, `:focus`, `::before`.
- **Box Model**:
  - Content → Padding → Border → Margin
  - Use `* { box-sizing: border-box; }` for predictable sizing.
- **Layout**:
```css
.container { display: flex; gap: 16px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
```
- **Responsive**:
```css
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
```
- **Units**: `px`, `%`, `rem` (root), `em` (parent), `vw`, `vh`.
- **Common patterns**:
```css
:root { --primary: #667eea; }
.btn { padding: 12px 20px; border-radius: 8px; background: var(--primary); color: #fff; }
.card { box-shadow: 0 4px 10px rgba(0,0,0,.1); border: 1px solid #e5e7eb; border-radius: 10px; }
.link { color: #2563eb; text-decoration: none; }
.link:hover { text-decoration: underline; }
```
- **Animations**:
```css
.fade-in { animation: fade .4s ease; }
@keyframes fade { from { opacity: 0 } to { opacity: 1 } }
```

---

## 3) JavaScript Notes

- **JS = Behavior**. Runs in browser and (with Node.js) on server.
- **Variables**:
```js
const PI = 3.14159; // constant
let count = 0;      // mutable
```
- **Types**: number, string, boolean, null, undefined, object, symbol, bigint.
- **Functions**:
```js
function add(a, b) { return a + b }
const multiply = (a, b) => a * b;
```
- **Objects/Arrays**:
```js
const user = { id: 1, name: 'Ada' };
const nums = [1,2,3];
const copy = { ...user, role: 'admin' };
const doubled = nums.map(n => n*2);
```
- **DOM**:
```js
document.querySelector('#btn').addEventListener('click', () => {
  document.querySelector('#out').textContent = 'Clicked!';
});
```
- **Async**:
```js
async function load() {
  const res = await fetch('/api');
  if (!res.ok) throw new Error('Request failed');
  const data = await res.json();
  return data;
}
```
- **Modules**:
```js
// lib.js
export const sum = (a,b) => a+b;
// main.js
import { sum } from './lib.js';
```

---

## 4) Node.js Notes (Backend)

- **Node.js**: JS runtime on server (V8). Non-blocking, event-driven I/O.
- **Initialize project**:
```bash
npm init -y
npm i express
npm i -D nodemon
```
- **Simple HTTP Server (Express)**:
```js
// app.js
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.post('/api/users', (req, res) => res.status(201).json(req.body));
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.listen(3000, () => console.log('http://localhost:3000'));
```
- **Scripts** (package.json):
```json
{
  "scripts": { "dev": "nodemon app.js", "start": "node app.js" }
}
```
- **ENV**: Use `.env` + `process.env`. Never commit secrets.

---

## 5) React Notes (Frontend)

- **React**: Component-based UI library. Declarative, Virtual DOM.
- **Create project (Vite)**:
```bash
npm create vite@latest my-app -- --template react
cd my-app && npm i && npm run dev
```
- **Component + State**:
```jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```
- **Props**:
```jsx
function Hello({ name = 'Guest' }) { return <p>Hello, {name}</p>; }
```
- **Effect**:
```jsx
import { useEffect } from 'react';
useEffect(() => { document.title = 'Loaded'; }, []);
```
- **Lists/Keys**:
```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

---

## 6) Git, GitHub, CI/CD Notes

- **Basic Git**:
```bash
git init
git add .
git commit -m "msg"
git branch -M main
git remote add origin https://github.com/user/repo.git
git push -u origin main
```
- **GitHub Pages (static)**: Settings → Pages → Deploy from `main` root. Site at `https://user.github.io/repo`.
- **GitHub Actions (CI)**:
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18', cache: 'npm' }
      - run: npm ci
      - run: npm test --if-present
      - run: npm run build --if-present
```
- **Env/Secrets**: Add secrets in Repo Settings → Secrets and variables → Actions.

---

## 7) Kubernetes (K8s) Notes

- **K8s**: Orchestrates containers at scale. Core objects: Pod, Deployment, Service, Ingress, ConfigMap, Secret.
- **Pod (basic)**:
```yaml
apiVersion: v1
kind: Pod
metadata: { name: hello }
spec:
  containers:
  - name: app
    image: nginx:alpine
    ports: [{ containerPort: 80 }]
```
- **Deployment + Service**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: web }
spec:
  replicas: 2
  selector: { matchLabels: { app: web } }
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
      - name: web
        image: nginx:alpine
        ports: [{ containerPort: 80 }]
---
apiVersion: v1
kind: Service
metadata: { name: web-svc }
spec:
  type: ClusterIP
  selector: { app: web }
  ports:
    - port: 80
      targetPort: 80
```
- **kubectl**:
```bash
kubectl apply -f k8s/
kubectl get pods,svc,deploy
kubectl logs deploy/web
kubectl rollout restart deploy/web
```
- **Helm**: Package manager for K8s charts. `helm install name chart/`.

---

## 8) Deployment Tips

- **Static sites**: GitHub Pages / Netlify / Vercel.
- **React apps**: Vercel/Netlify (build + CDN). 
- **Node APIs**: Render / Railway / Fly.io / VPS (Docker).
- **Best practices**: Env vars, logs, health endpoints, backups.

---

## 9) Quick Reference

- **HTTP Codes**: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Server Error.
- **Content Types**: `text/html`, `application/json`, `multipart/form-data`.
- **Security**: Never trust input; validate & sanitize. Use HTTPS. Don’t commit secrets. Use CORS properly.
- **Performance**: Minify assets, cache, lazy-load images, paginate API.

---

## 10) Roadmap (Suggested)

1. HTML Basics → CSS Basics → JS Basics
2. Build small projects (Todo, Calculator, Portfolio)
3. Learn Git/GitHub → Host with GitHub Pages
4. Dive into Node.js (REST API with Express)
5. Learn React fundamentals (components, hooks)
6. Add CI with GitHub Actions
7. Containerize (Docker) → Learn K8s basics
8. Build a full-stack project and deploy

---

## 11) Snippets You’ll Reuse

```html
<!-- Center container -->
<div style="max-width:900px;margin:0 auto;padding:16px"></div>
```
```css
/* Visually hidden but accessible */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
```
```js
// Debounce
const debounce=(fn,d=300)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d)}}
```

---

Keep learning. Keep shipping. 🚀
