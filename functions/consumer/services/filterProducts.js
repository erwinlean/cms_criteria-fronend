"use strict";

export function filterProducts(searchTerm) {
    const productDivs = document.querySelectorAll("#searchedProduct > div");

    productDivs.forEach(productDiv => {
        const productDescription = productDiv.querySelector('h3').textContent.toLowerCase();
        const productSku = productDiv.querySelector('h2').textContent.toLowerCase();
        // Add more information for search if needed

        if (productDescription.includes(searchTerm.toLowerCase()) || productSku.includes(searchTerm.toLowerCase())) {
            productDiv.style.display = 'block';
        } else {
            productDiv.style.display = 'none';
        };
    });
};