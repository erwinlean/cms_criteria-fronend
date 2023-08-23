"use strict";

import { getProduct } from './services/getProduct.js';
import { displayProducts } from "./services/displayProducts.js";
import { filterProducts } from './services/filterProducts.js';

const searchInput = document.querySelector("body > div.body-section > div.info-section > div.products-by-sku > div:nth-child(1) > input[type=search]");

async function pimProducts() {
    try {
        const result = await getProduct();

        return displayProducts(result._embedded.items);
    } catch (error) {
        console.error('Error in pimProducts:', error);
    };
};

function filter() {
    const searchTerm = searchInput.value;
    filterProducts(searchTerm);
};

pimProducts();
searchInput.addEventListener("input", filter);