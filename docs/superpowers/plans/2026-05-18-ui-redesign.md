# UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a Clean Light Theme refresh of the TJHS School Holiday Site Usage dashboard using modern Vanilla CSS.

**Architecture:** A direct CSS rewrite introducing modern design tokens (CSS variables) for a Slate-based color palette, subtle shadows, and pill-shaped tabs. Minor JS adjustments are included to generate pastel colors for schedule slots. No build step or test framework is used, so verification is visual/manual via `index.html`.

**Tech Stack:** HTML5, Vanilla JS (ES6+), Vanilla CSS3.

---

### Task 1: Update Dynamic Color Generation in app.js

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Verify current color generation manually**
  Run a local server (e.g., `python -m http.server 8000`) and open `http://localhost:8000`. Observe the current slot colors are random and sometimes dark/harsh.

- [ ] **Step 2: Update HSL generation logic**
  Replace the inline styling logic in `app.js` inside `renderTable`.

```javascript
// In app.js, locate the color assignment inside renderTable:
// const h = userColorMap.get(cellValue);
// td.style.setProperty("--slot-bg", `hsl(${h}, 70%, 85%)`);
// td.style.setProperty("--slot-color", `hsl(${h}, 80%, 25%)`);

// Replace it with:
const h = userColorMap.get(cellValue);
// Use pastel ranges: 70% saturation, 90% lightness for bg, 30% lightness for text
td.style.setProperty("--slot-bg", `hsl(${h}, 70%, 90%)`);
td.style.setProperty("--slot-color", `hsl(${h}, 80%, 30%)`);
```

- [ ] **Step 3: Verify the changes visually**
  Refresh the browser. The slot backgrounds should be softer (lighter) and the text should have good contrast.

- [ ] **Step 4: Commit**
```bash
git add app.js
git commit -m "chore: adjust HSL values for pastel slot colors"
```

---

### Task 2: Implement Modern CSS Design Tokens and Layout

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Replace CSS root variables and reset**

```css
/* Replace the :root and body sections in style.css */
:root {
    --primary-color: #3b82f6; /* Blue 500 */
    --primary-hover: #2563eb;
    --bg-color: #f8fafc; /* Slate 50 */
    --card-bg: #ffffff;
    --text-main: #0f172a; /* Slate 900 */
    --text-muted: #475569; /* Slate 600 */
    --border-color: #e2e8f0; /* Slate 200 */
    --slot-empty: #f8fafc;
    --slot-used: #eff6ff; /* Fallback Blue 50 */
    --slot-used-text: #1d4ed8; /* Fallback Blue 700 */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Update App Container and Header styling**

```css
/* Replace .app-container and header sections */
.app-container {
    max-width: 1200px;
    width: 95vw;
    margin: 0 auto;
    padding: 3rem 1rem;
}

header {
    margin-bottom: 2.5rem;
    text-align: center;
}

header h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--text-main);
    letter-spacing: -0.025em;
}

header p {
    color: var(--text-muted);
    font-size: 1rem;
}
```

- [ ] **Step 3: Update Venue Selector (Tabs)**

```css
/* Replace .venue-selector and .venue-btn sections */
.venue-selector {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
}

.venue-btn {
    padding: 0.5rem 1.25rem;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 9999px;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.venue-btn:hover {
    background-color: var(--card-bg);
    color: var(--text-main);
    border-color: #cbd5e1;
    box-shadow: var(--shadow-sm);
}

.venue-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}
```

- [ ] **Step 4: Update Table Container and Table Styling**

```css
/* Replace .table-container and table sections */
.table-container {
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    border: 1px solid var(--border-color);
}

.table-container::-webkit-scrollbar {
    height: 8px;
}

.table-container::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0 0 16px 16px;
}

.table-container::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    min-width: 800px;
}

th,
td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    white-space: nowrap;
    min-width: 120px;
}

th:last-child,
td:last-child {
    border-right: none;
}

th {
    background-color: var(--card-bg);
    font-weight: 600;
    color: var(--text-muted);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 2px solid var(--border-color);
    text-align: center;
}

tbody tr:last-child td {
    border-bottom: none;
}

td:first-child,
th:first-child {
    font-weight: 600;
    background-color: var(--card-bg);
    color: var(--text-main);
    position: sticky;
    left: 0;
    z-index: 20;
    border-right: 2px solid var(--border-color);
    min-width: 140px;
}

th:first-child {
    z-index: 30;
}

.table-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 140px;
    width: 8px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.03), transparent);
    pointer-events: none;
    z-index: 15;
    opacity: 0;
    transition: opacity 0.3s;
}

/* Status styling */
td.slot-empty {
    background-color: var(--slot-empty);
    color: #94a3b8;
    font-size: 0.875rem;
    text-align: center;
}

td.slot-used {
    background-color: var(--slot-bg, var(--slot-used));
    color: var(--slot-color, var(--slot-used-text));
    font-weight: 500;
    font-size: 0.875rem;
    text-align: center;
    border-radius: 4px; /* Slight inner rounding for modern feel */
}

/* Utilities & Hover */
.hidden {
    display: none;
}

.loading-state {
    text-align: center;
    padding: 4rem;
    color: var(--text-muted);
    font-size: 1.125rem;
    font-weight: 500;
}

tbody tr {
    transition: background-color 0.15s ease;
}

tbody tr:hover td {
    background-color: #f8fafc;
}

tbody tr:hover td:first-child {
    background-color: #f8fafc;
}

tbody tr:hover td.slot-used {
    filter: brightness(0.97);
}

footer {
    text-align: center;
    padding: 3rem 2rem;
    color: var(--text-muted);
    font-size: 0.875rem;
}

footer p {
    margin: 0.25rem 0;
}

.footer-link {
    color: var(--text-muted);
    text-decoration: underline;
    text-underline-offset: 4px;
    font-weight: 500;
    transition: color 0.2s;
}

.footer-link:hover {
    color: var(--text-main);
}
```

- [ ] **Step 5: Verify visual changes locally**
  Refresh `http://localhost:8000`. Confirm the modern font weights, pill-shaped tabs, softer shadows, cleaner borders, and better contrast for the text and slot backgrounds. The design should match the Clean Light Theme spec.

- [ ] **Step 6: Commit**
```bash
git add style.css
git commit -m "style: implement modern Clean Light Theme CSS design system"
```