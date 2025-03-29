function loadExcelData() {
    const tableBody = document.querySelector('#data-table tbody');

    fetch('database.xlsx')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert sheet to an array-of-arrays (ignoring header row)
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log('Excel Data:', rows);
            
            // Clear any existing table data
            tableBody.innerHTML = '';

            // Assume first row is header; start from index 1
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const tr = document.createElement('tr');
                for (let j = 0; j < 14; j++) {
                    const td = document.createElement('td');
                    td.textContent = row[j] !== undefined ? row[j] : '';
                    tr.appendChild(td);
                }
                tableBody.appendChild(tr);
            }
        })
        .catch(error => {
            console.error('Error loading the Excel file:', error);
        });
}

// This code runs in the browser
window.addEventListener('load', loadExcelData);
window.addEventListener('load', function() {
    // New palette order: colors rearranged
    const palette = ['#91c4f2', '#b668b5', '#8974d2', '#fae8a0', '#beffc7'];
    const allElements = document.querySelectorAll('*');
    
    // Try to retrieve a stored colors array from localStorage
    let storedColors = localStorage.getItem('randomColors');
    if (storedColors) {
      try {
        storedColors = JSON.parse(storedColors);
      } catch (e) {
        storedColors = null;
      }
    }
    
    // If no stored colors or if the number of elements has changed, generate a new array
    if (!storedColors || storedColors.length !== allElements.length) {
      storedColors = Array.from({ length: allElements.length }, () => {
        return palette[Math.floor(Math.random() * palette.length)];
      });
      localStorage.setItem('randomColors', JSON.stringify(storedColors));
    }
    
    // Assign the stored (or newly generated) colors to each element
    allElements.forEach((el, index) => {
      el.style.backgroundColor = storedColors[index];
      el.style.color = 'black';
    });
});
