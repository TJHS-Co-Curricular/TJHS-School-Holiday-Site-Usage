# Wide Page Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove internal scrollbars and allow the dashboard to render at its full natural width.

**Architecture:** CSS modifications to `.app-container` and `.table-container` to allow expansion and disable nested scrolling. Sticky headers and the Date column remain functional for horizontal page scrolling.

**Tech Stack:** CSS3.

---

### Task 1: Update CSS for Wide Page Layout

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Modify .app-container to allow full width**

```css
/* In style.css, find .app-container and replace its properties */
.app-container {
    max-width: none; /* Remove 1200px limit */
    width: fit-content; /* Ensure container matches table width */
    min-width: 100%; /* Spans at least the full viewport */
    margin: 0 auto;
    padding: 3rem 1rem;
}
```

- [ ] **Step 2: Disable internal scroll on .table-container**

```css
/* In style.css, find .table-container and modify overflow-x */
.table-container {
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    overflow-x: visible; /* Changed from auto to visible */
    overflow-y: hidden;
    position: relative;
    border: 1px solid var(--border-color);
}
```

- [ ] **Step 3: Update table and column widths for better "Full Size" feel**

```css
/* Ensure table takes full width and columns have a comfortable min-width */
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    min-width: 100%; /* Changed from 800px to 100% */
}

th,
td {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    white-space: nowrap;
    min-width: 130px; /* Slightly wider for better spacing */
}
```

- [ ] **Step 4: Verify visual changes**
  Open `index.html` in a browser. The table should now render at its full width without a scrollbar inside the white card. If the table is wider than your screen, the whole page should scroll horizontally.

- [ ] **Step 5: Commit**

```bash
git add style.css
git commit -m "style: implement wide page layout without internal scrollbars"
```
