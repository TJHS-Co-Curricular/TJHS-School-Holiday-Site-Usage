# Wide Page Layout Specification

## Overview
Modify the dashboard layout to remove internal scrollbars and allow the table to render at its full natural width. This "Full Size" view ensures that the entire schedule is visible without needing to interact with a nested scroll container, leveraging the full width of the user's browser or display.

## Architecture
- **HTML**: No changes.
- **CSS**: 
  - Remove `max-width` restrictions on `.app-container`.
  - Disable `overflow-x: auto` on `.table-container`.
  - Ensure the "sticky" Date column remains functional for horizontal page scrolling.

## Design System
- **App Container**: `max-width: none`, `width: fit-content`, `min-width: 100%`.
- **Table Container**: `overflow-x: visible`, `box-shadow` maintained.
- **Table**: `min-width: 100%`.
- **Columns**: Maintain `min-width: 120px` to prevent data squashing, but allow expansion.

## Components
- **Sticky Column**: The first column (Date) will continue to use `position: sticky` and `left: 0`. The visual shadow separator will be maintained to provide depth.

## Testing
- Verify that no internal scrollbar appears within the table container.
- Verify that the Date column stays sticky when the browser window is narrower than the table.
- Verify that the app background and footer span the full width of the expanded table.