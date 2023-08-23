"use strict";

import {separatorStyle} from "../utils/dataSeparator.js";

export function openModalData(file) {
    const modal = document.getElementById("fileModal");
    const table = document.getElementById("fileInfoTable");

    table.innerHTML = "";

    // Iterate through file properties and add them to the table
    for (const [key, value] of Object.entries(file)) {
        const row = document.createElement("tr");
        const keyCell = document.createElement("td");
        keyCell.textContent = key;
        const valueCell = document.createElement("td");

        // Special handling for "data" key
        if (key === "data" && Array.isArray(value)) {
            const dataText = value.map(item => {
                const attributesText = Object.entries(item.attributes).map(([attrKey, attrValue]) => {
                    if (typeof attrValue === "object" && attrValue !== null && "data" in attrValue) {
                        return `${attrKey}: ${attrValue.data}`;
                    };
                    
                    return `${attrKey}: ${attrValue[0].data}`;
                }).join(", ");
                return `Identifier: ${item.identifier},<br> Attributes: ${attributesText}${separatorStyle()}`;
            }).join("<br>");

            valueCell.innerHTML = dataText;
        } else {
            valueCell.textContent = value;
        };

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    };

    modal.style.display = "block";

    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        };
    });

    function closeModal() {
        modal.style.display = "none";
    };
};
