"use strict";

import {capitalizeFirstLetter} from "./utils/capitalizeLetter.js";
import {createCheckbox} from "./utils/checkProduct.js";

export async function displayProducts(data) {

    let imageAdded = false;

    try {
        data.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList = "product-list";
        
            // Check-product span
            productDiv.appendChild(createCheckbox());
        
            for (const attributeName in product.values) {
                if (product.values.hasOwnProperty(attributeName)) {
                    const attributeValue = product.values[attributeName][0].data;
        
                    let adjustedAttributeName = attributeName;
                    if (attributeName.startsWith("atr_")) {
                        adjustedAttributeName = attributeName.slice(4); // Remove "atr_"
                    };
        
                    const lowerAttributeName = attributeName.toLowerCase();
                    const lowerAttributeValue = attributeValue.toLowerCase();
                    adjustedAttributeName = capitalizeFirstLetter(adjustedAttributeName);
        
                    // Check if attributeName includes "image" or "img" and if attributeValue is an image URL
                    if (lowerAttributeName.includes("image") || lowerAttributeName.includes("img")) {
                        if (lowerAttributeValue.endsWith(".png") || lowerAttributeValue.endsWith(".jpg") || lowerAttributeValue.endsWith(".jpeg")) {
                            const img = document.createElement("img");
                            img.src = attributeValue;
                            img.alt = "Product Image";
                            img.title = "Product Image";
                            img.style.cursor = "pointer";
                            productDiv.appendChild(img);
                            imageAdded = true;
                        }
                    } else {
                        const h4 = document.createElement("h4");
                        h4.textContent = `${adjustedAttributeName}: ${attributeValue}`;
                        if (attributeName === "sku") {
                            h4.classList.add("sku-product");
                        } else {
                            h4.classList.add("product-data");
                        };
                        productDiv.appendChild(h4);
                    };
                };
            };
        
            document.querySelector("#searchedProduct").appendChild(productDiv);
        });        
    } catch (error) {
        console.error("Error displaying products:", error);
    };
};