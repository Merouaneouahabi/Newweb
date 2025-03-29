// Helper function to parse a simple CSV (assumes no commas within cells)
function parseCSV(text) {
  // Split into rows, trim whitespace, and filter out any empty rows
  const lines = text.trim().split("\n").filter(line => line);
  return lines.map(line => line.split(","));
}

function loadCSVData() {
  const tableBody = document.querySelector('#data-table tbody');
  // Your published Google Sheets CSV URL:
  const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9PP2C18SawMDZ_6hbrX-DWTknEvGnJThqmQYYrLZSPqY3yd_0aTCrnkNH5wW3VW9fvDY9zEqxlSOc/pub?gid=0&single=true&output=csv";

  fetch(csvURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.text();
    })
    .then(csvText => {
      const rows = parseCSV(csvText);
      console.log("Parsed CSV rows:", rows);
      tableBody.innerHTML = "";
      
      // Assuming the first row is the header; start from index 1.
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const tr = document.createElement('tr');
        // Loop for 14 columns – if row has fewer than 14 cells, fill with empty string.
        for (let j = 0; j < 14; j++) {
          const td = document.createElement('td');
          td.textContent = row[j] !== undefined ? row[j] : "";
          tr.appendChild(td);
        }
        tableBody.appendChild(tr);
      }
    })
    .catch(error => {
      console.error("Error fetching CSV:", error);
    });
}

window.addEventListener("load", loadCSVData);
