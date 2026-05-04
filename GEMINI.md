# Project Overview
This is a simple, view-only frontend web application designed to display venue usage schedules (specifically for May 2026) during school holidays. The dashboard reads data from static CSV files and presents it in a modern, interactive grid/table format.

## Technologies
- **HTML5**: Semantic structure (`index.html`).
- **Vanilla JavaScript (ES6+)**: Handles fetching CSV files, parsing data, and dynamically updating the DOM (`app.js`).
- **Vanilla CSS3**: Styling, layout, and responsive design (`style.css`). No external CSS frameworks (like Tailwind or Bootstrap) are used.
- **Data Source**: Local CSV files located in the `Venue/` directory (`VenueA.csv`, `VenueB.csv`, `VenueC.csv`).

## Architecture & Data Flow
1. Upon initialization, `app.js` renders venue selection tabs.
2. It fetches the corresponding CSV file from the `Venue/` directory using the `fetch()` API.
3. The raw CSV data is parsed into a structured format (headers and rows).
4. The application dynamically rebuilds an HTML table (`#scheduleTable`) to display the schedule grid.

## Building and Running
Since this project uses Vanilla web technologies without a build step, there are no build commands (e.g., no `npm run build`).

However, because it uses the `fetch()` API to load local CSV files, opening `index.html` directly in a browser via the `file://` protocol will likely fail due to cross-origin restrictions.

**To run the project:**
Serve the project directory using a local web server. Examples:
- **Python**: `python -m http.server 8000`
- **Node.js**: `npx http-server` or `npx serve`
- **VS Code**: Use the "Live Server" extension.

Navigate to `http://localhost:8000` (or the respective port) in your web browser.

## Development Conventions
- **Styling**: Stick to Vanilla CSS. Avoid introducing external CSS frameworks as per the design document (`docs/design.md`). Use clean styling with variables, flexbox/grid for layouts, and soft UI elements.
- **JavaScript**: Use modern ES6+ features (e.g., `async/await`, template literals, arrow functions). Maintain logic within `app.js` without relying on external libraries.
- **Data**: Ensure any updates to the schedules are done within the CSV files (`Venue/`), maintaining the existing comma-separated format.