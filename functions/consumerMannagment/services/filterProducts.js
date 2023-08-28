"use strict";

export function filterProducts(searchTerm) {
    const productDivs = document.querySelectorAll("#searchedProduct > div");

    productDivs.forEach(productDiv => {
        const productDataElements = productDiv.querySelectorAll(".product-data");

        const productDataText = Array.from(productDataElements)
            .map(element => element.textContent.toLowerCase())
            .join(" ");

        if (productDataText.includes(searchTerm.toLowerCase())) {
            productDiv.style.display = "block";
        } else {
            productDiv.style.display = "none";
        };
    });
};