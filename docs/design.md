# School Holiday Site Usage - Design Plan

## 1. Overview
The goal is to build a visually appealing, interactive, view-only dashboard that displays venue usage during school holidays. The application will read data from the existing static CSV files (`VenueA.csv`, `VenueB.csv`, `VenueC.csv`) and present it in an easily digestible, modern calendar/grid format.

## 2. Technology Stack
*   **HTML5:** Semantic structure for the dashboard.
*   **Vanilla JavaScript (ES6+):** For fetching the CSV files, parsing the data, and dynamically rendering the UI without the overhead of a framework.
*   **Vanilla CSS3:** For styling, utilizing CSS Grid and Flexbox for responsive layout, CSS variables for theming, and smooth transitions for interactive elements. No external CSS frameworks (like Tailwind or Bootstrap) will be used.

## 3. Architecture & Data Flow
1.  **Initialization:** On page load, JavaScript will fetch the CSV files from the local `/Venue/` directory using the `fetch()` API.
2.  **Parsing:** The raw CSV text will be parsed into structured JavaScript objects (Arrays of Objects) representing rows (Dates) and columns (Time slots: 08:00 - 18:00).
3.  **State Management:** The app will store the parsed data in memory and keep track of the currently selected Venue.
4.  **Rendering:** A render function will clear and rebuild the UI grid whenever the selected Venue changes.

## 4. UI/UX Design
*   **Layout:**
    *   **Header:** Title of the application ("School Holiday Site Usage").
    *   **Venue Selector (Tabs/Pills):** Prominent buttons to seamlessly switch views between Venue A, Venue B, and Venue C.
    *   **Main Grid Area:** A table or CSS Grid displaying the schedule.
        *   *Y-Axis (Rows):* Dates (e.g., 23.05.2026, 24.05.2026).
        *   *X-Axis (Columns):* Time slots (08:00 to 18:00).
*   **Visual Aesthetics (Modern & Polished):**
    *   **Color Palette:** Clean white background for the grid, subtle gray background for the page (`#f3f4f6`), with primary accent colors (e.g., modern blue `#3b82f6` for selections/headers).
    *   **Typography:** Clean sans-serif font (system fonts like Segoe UI, San Francisco, or Inter).
    *   **Styling Details:** Soft shadows (`box-shadow`), rounded borders (`border-radius: 8px`), and hover effects on rows/slots to make the interface feel alive.
    *   **Data Visualization:**
        *   Empty slots will have a light, subtle color.
        *   Occupied/Used slots (if the CSV contains data other than empty space) will be highlighted with a distinct color (e.g., soft red or green depending on the meaning) and display the relevant text.

## 5. Implementation Steps
1.  **Step 1:** Setup the `index.html` skeleton and link `style.css` and `app.js`.
2.  **Step 2:** Write the CSS for the layout, typography, and polished visual components.
3.  **Step 3:** Implement the JavaScript logic to fetch and parse the CSV files.
4.  **Step 4:** Build the dynamic UI rendering logic to display the tabs and the data grid.
5.  **Step 5:** Final polish (responsive adjustments, hover states, error handling if a file is missing).
