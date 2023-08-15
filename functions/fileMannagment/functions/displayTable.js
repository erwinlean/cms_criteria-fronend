"use strict";

export function displayProductsTable(products) {

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