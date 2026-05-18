# UI Redesign Specification

## Overview
A visual refresh of the TJHS School Holiday Site Usage dashboard using modern web UI principles (Clean Light Theme). The implementation relies entirely on Vanilla CSS and JS without introducing new frameworks or altering the core layout/features.

## Architecture
- **HTML**: Retains current structure (Header -> Tabs -> Table).
- **JS**: Minor tweaks to adjust CSS variables for HSL colors to ensure a modern pastel look. No structural logic changes.
- **CSS**: A complete rewrite of `style.css` using modern design tokens and utility-like variables.

## Design System
- **Background**: `#F8FAFC` (Slate 50)
- **Cards/Table**: `#FFFFFF` with subtle shadows (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)`)
- **Typography**: Inter (existing). Primary text `#0F172A`, Muted text `#475569`.
- **Primary Accent**: `#3B82F6` (Blue 500) for active tabs and interactive highlights.
- **Borders**: `#E2E8F0` (Slate 200).

## Components
- **Tabs (Venue Selector)**: Pill-shaped buttons (`border-radius: 9999px`). Smooth background and text color transitions (`transition: all 0.2s ease`). Active tab uses primary accent color.
- **Data Table**: 
  - Sticky header (`top: 0`) and sticky first column (`left: 0`).
  - Lighter, cleaner borders.
  - Hover states on rows (`background-color: #F1F5F9`).
  - Dynamic slot colors generated via JS will be tweaked to use pastel ranges (`hsl(X, 70%, 90%)` for bg, `hsl(X, 80%, 30%)` for text).

## Error Handling & Edge Cases
- **Empty State**: Existing empty slots keep a subtle gray background (`#F8FAFC`).
- **Loading State**: Centered, muted text.
- **Responsiveness**: Horizontal scrolling enabled for the table container on smaller screens. Container `max-width` set to `95vw` or `1200px`.

## Testing
- Verify all tabs switch venues correctly.
- Verify sticky headers and columns work properly during scrolling.
- Check contrast ratios for generated HSL colors.
- Ensure no layout shift occurs on tab hover.