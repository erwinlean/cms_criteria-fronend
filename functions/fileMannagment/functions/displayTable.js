"use strict";

import {transformSkuTable} from "../utils/schemaHelpers.js";

export function displayProductsTable(products) {
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

        Object.values(product).forEach((value, index) => {
            // Transform the first column value using the utility function
            if (index === 0) {
                value = transformSkuTable(value);
            };

            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
}