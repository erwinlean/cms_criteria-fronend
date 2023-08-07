"use strict";

//Capture elements from DOM
const input = document.getElementById("input");
const sendBtn = document.getElementById("btn")

let products = [];

const convert_file_to_json = (event) => {

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

                displayProductsInTable(products);
            });
        };
    };
};

// Showing the input XLSX in the DOM
function displayProductsInTable(products) {

    // Display the table
    document.getElementById("uploadedFilesTable").style.display = "flow-root";


    const table = document.getElementById("uploadedFilesTable");
    const tbody = table.querySelector("tbody");
    const headerRow = table.querySelector("#productHeader");

    // Clear table
    tbody.innerHTML = "";

    // Create and append cells
    headerRow.innerHTML = "";
    Object.keys(products[0]).forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    // Create and append rows (from second)
    for (let i = 1; i < products.length; i++) {
        const product = products[i];
        const tr = document.createElement("tr");

        Object.values(product).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    };
};



/* Send the file to the backend after validation and converted from xlsx to json */
async function sendFile () {
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.email;

    console.log("Archivo enviado por: " + userEmail);

    const fileData = {
        fileName: "test_file",
        brand: "pepito",
        data: transformData(products),
        userUpload: userEmail,
    };
    
    console.log(typeof(fileData));
    console.log(fileData);

    // Comented hasta que funcione la limpieza del xlsx
    try {

        const response = await fetch('http://localhost:8080/api/files/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(fileData),
        });

        if (response.ok) {
            const createdFile = await response.json();
            console.log('Archivo creado:', createdFile);

            getFiles(); // Loaded files in the backend, showing in the DOM
        } else {
            const errorData = await response.json();
            console.log('Error al crear el archivo:', errorData);
        };
    } catch (error) {
        console.log('Error en la solicitud:', error);
    };
};

//Execute json convert
input.addEventListener("change", convert_file_to_json);

// Send file
sendBtn.addEventListener("click", sendFile);