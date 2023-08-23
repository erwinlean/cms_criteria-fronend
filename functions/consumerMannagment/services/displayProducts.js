"use strict";

import {capitalizeFirstLetter} from "./utils/capitalizeLetter.js";

export async function displayProducts(data) {
    try {
        data.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList = "product-list";
            const attributeDiv = document.createElement("div");
            attributeDiv.classList = "product-attributes";
            productDiv.appendChild(attributeDiv);

            for (const attributeName in product.values) {
                if (product.values.hasOwnProperty(attributeName)) {
                    const attributeValue = product.values[attributeName][0].data;

                    let adjustedAttributeName = attributeName;
                    if (attributeName.startsWith("atr_")) {
                        adjustedAttributeName = attributeName.slice(4); // Remove "atr_"
                    };
                    adjustedAttributeName = capitalizeFirstLetter(adjustedAttributeName);

                    const h4 = document.createElement("h4");
                    h4.textContent = `${adjustedAttributeName}: ${attributeValue}`;

                    if (attributeName === "sku") {
                        h4.classList.add("sku-product");
                    } else {
                        h4.classList.add("product-data");
                    };

                    attributeDiv.appendChild(h4);
                };
            };

            document.querySelector("#searchedProduct").appendChild(productDiv);
        });
    } catch (error) {
        console.error("Error displaying products:", error);
    };
};