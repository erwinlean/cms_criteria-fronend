"use strict";

import { displayProductsTable } from '../functions/displayTable.js'; 

export let products = [];

export const convert_file_to_json = (event) => {

    let loadedFile = event.target.files[0];

    // Clear products
    products = [];

    //Convert xlsx to json
    if (loadedFile) {
        let file_reader = new FileReader();
        file_reader.readAsBinaryString(loadedFile);

        file_reader.onloadend = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, {
                type: "binary",
            });


            /* MISSING VALIDATION FOREACH ROW (example: sku must have only number) */
            workbook.SheetNames.forEach((sheet) => {
                let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
                    raw: false,
                    header: 1, // Use the first row as headers
                    defval: "", // Set empty cells to null
                });

                // Validate and filter rows with incomplete data for "sku", "brand", and "label"
                sheetData = sheetData.filter((row, rowIndex) => {
                    const sku = row[0];    // Add more  rows to check if needed
                    const brand = row[2];  // Add more  rows to check if needed 
                    const label = row[1];  // Add more  rows to check if needed 

                    if (rowIndex === 0 || (sku && brand && label)) {
                        // Keep the row if it's the header row or has all required data
                        return true;
                    } else {

                        // Log and discard the row with incomplete data
                        alert(`Fila ${rowIndex + 1} falta informacion, se encutra vacia, se salteara la fila.`);
                        return false;
                    }
                });

                // Ensure all rows have the same number of properties as the first row
                const maxColumns = Math.max(...sheetData.map((row) => row.length));
                sheetData = sheetData.map((row) => {
                    const diff = maxColumns - row.length;
                    if (diff > 0) {
                        const emptyColumns = Array(diff).fill(null);
                        return [...row, ...emptyColumns];
                    }
                    return row;
                });

                // Convert the sheet data to an array of objects (JSON)
                let file_traduced = sheetData.map((row) => {
                    const obj = {};
                    sheetData[0].forEach((header, columnIndex) => {
                        obj[header] = row[columnIndex];
                    });
                    return obj;
                });

                products = file_traduced;

                displayProductsTable(products);
            });
        };
    };
};