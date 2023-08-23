"use strict";

export function filterProducts(searchTerm) {
    const productDivs = document.querySelectorAll("#searchedProduct > div");

    productDivs.forEach(productDiv => {
        const productData = productDiv.querySelector('h4').textContent.toLowerCase();
        // Add more information for search if needed

        if (productData.includes(searchTerm.toLowerCase())) {
            productDiv.style.display = 'block';
        } else {
            productDiv.style.display = 'none';
        };
    });
};