"use strict";

export async function displayProducts(data) {
    try {

        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList = "product-list"
            
            productDiv.innerHTML = `
                <h2>Product ID: ${product.identifier}</h2>
                <h3>Description: ${product.values.description[0].data}</h3>
                <p>SKU: ${product.values.sku[0].data}</p>
            `;
            
            document.querySelector("#searchedProduct").appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error displaying products:', error);
    };
};