"use strict";

import { getProduct } from './services/getProduct.js';
import { displayProducts } from "./services/displayProducts.js";
import { filterProducts } from './services/filterProducts.js';
import { openImageModal, closeImageModal } from "./services/utils/zoomProduct.js";
import { checkAll, getProductsInformation } from "./services/utils/checkProduct.js";

const searchInput = document.querySelector("body > div.body-section > div.info-section > div.products-by-sku > div:nth-child(1) > input[type=search]");
let src = "";
const selectAll = document.querySelector("#selecAllProducts");
const downloadProductsPDF = document.querySelector("#downloadButton");

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

//images zoom
document.addEventListener("click", function () {
    // Variables
    let src = "";
    const imgModal = document.getElementById("imgModal");
    const modalImage = document.getElementById("modalImage");
    const closeModalImg = document.getElementById("closeModalImg");

    // Attach click event listeners to images
    document.addEventListener("click", function (event) {
        if (event.target.matches("#searchedProduct > div > img")) {
            src = event.target.getAttribute('src');
            openImageModal(src);
        }
    });

    // Close the modal when the "x" button is clicked
    closeModalImg.addEventListener("click", closeImageModal);

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === imgModal) {
            closeImageModal();
        }
    });
});

/* Check products*/
selectAll.addEventListener("click", checkAll)

/* Download products checked */
downloadProductsPDF.addEventListener("click", function () {

    getProductsInformation();
});