const venues = [
  { id: "VenueA", name: "大礼堂", file: "Venue/VenueA.csv" },
  { id: "VenueB", name: "大讲堂", file: "Venue/VenueB.csv" },
  { id: "VenueC", name: "伯才堂", file: "Venue/VenueC.csv" },
];

let currentVenueId = venues[0].id;
let venueData = {}; // Cache to store fetched data

// Load saved colors from localStorage or initialize a new Map
const savedColors = localStorage.getItem('userColorMap');
const userColorMap = savedColors ? new Map(JSON.parse(savedColors)) : new Map();

const DOM = {
  selector: document.getElementById("venueSelector"),
  table: document.getElementById("scheduleTable"),
  thead: document.getElementById("scheduleHead"),
  tbody: document.getElementById("scheduleBody"),
  loading: document.getElementById("loadingState"),
};

// Initialize App
function init() {
  renderVenueTabs();
  loadVenue(currentVenueId);
}

// Render the venue selection tabs
function renderVenueTabs() {
  DOM.selector.innerHTML = "";
  venues.forEach((venue) => {
    const btn = document.createElement("button");
    btn.className = `venue-btn ${venue.id === currentVenueId ? "active" : ""}`;
    btn.textContent = venue.name;
    btn.onclick = () => {
      if (currentVenueId !== venue.id) {
        currentVenueId = venue.id;
        renderVenueTabs(); // Update active state
        loadVenue(currentVenueId);
      }
    };
    DOM.selector.appendChild(btn);
  });
}

// Load and display data for a specific venue
async function loadVenue(venueId) {
  showLoading(true);

  if (!venueData[venueId]) {
    try {
      const venue = venues.find((v) => v.id === venueId);
      const response = await fetch(venue.file);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const csvText = await response.text();
      venueData[venueId] = parseCSV(csvText);
    } catch (error) {
      console.error("Failed to load CSV:", error);
      DOM.loading.textContent =
        "Error loading schedule. Please check if data files exist.";
      DOM.table.classList.add("hidden");
      return;
    }
  }

  renderTable(venueData[venueId]);
  showLoading(false);
}

// Simple CSV parser
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length === 0) return { headers: [], rows: [] };

  // Standardize newline breaks in case it's \r\n
  const cleanLines = lines.map((line) => line.replace("\r", ""));

  const headers = cleanLines[0].split(",");
  const rows = cleanLines.slice(1).map((line) => {
    const values = line.split(",");
    // Some empty slots might be just commas, pad them if necessary
    while (values.length < headers.length) {
      values.push("");
    }
    return values;
  });

  return { headers, rows };
}

// Render the HTML table
function renderTable(data) {
  if (!data || data.headers.length === 0) {
    DOM.table.classList.add("hidden");
    return;
  }

  // Render Headers
  DOM.thead.innerHTML = "";
  const headerRow = document.createElement("tr");
  data.headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  DOM.thead.appendChild(headerRow);

  // Render Rows
  DOM.tbody.innerHTML = "";
  data.rows.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell, index) => {
      const td = document.createElement("td");
      const cellValue = cell.trim();

      td.textContent = cellValue || "-";

      // Add styling based on content (assuming first column is Date)
      if (index > 0) {
        if (cellValue) {
          td.classList.add("slot-used");
          
          if (!userColorMap.has(cellValue)) {
            let randomHue;
            let isValid = false;
            let attempts = 0;
            let minDistance = 45; // Require at least 45 degrees of hue separation

            while (!isValid && attempts < 100) {
              randomHue = Math.floor(Math.random() * 360);
              isValid = true;
              
              for (const existingHue of userColorMap.values()) {
                let diff = Math.abs(randomHue - existingHue);
                if (diff > 180) diff = 360 - diff;
                
                if (diff < minDistance) {
                  isValid = false;
                  break;
                }
              }
              attempts++;
              if (attempts % 10 === 0 && minDistance > 5) {
                minDistance -= 5;
              }
            }

            userColorMap.set(cellValue, randomHue);
            localStorage.setItem('userColorMap', JSON.stringify(Array.from(userColorMap.entries())));
          }
          
          const h = userColorMap.get(cellValue);
          td.style.setProperty("--slot-bg", `hsl(${h}, 70%, 85%)`);
          td.style.setProperty("--slot-color", `hsl(${h}, 80%, 25%)`);
        } else {
          td.classList.add("slot-empty");
        }
      }

      tr.appendChild(td);
    });
    DOM.tbody.appendChild(tr);
  });

  DOM.table.classList.remove("hidden");
}

// Toggle loading state
function showLoading(isLoading) {
  if (isLoading) {
    DOM.loading.classList.remove("hidden");
    DOM.table.classList.add("hidden");
  } else {
    DOM.loading.classList.add("hidden");
    DOM.table.classList.remove("hidden");
  }
}

// Start app
document.addEventListener("DOMContentLoaded", init);
