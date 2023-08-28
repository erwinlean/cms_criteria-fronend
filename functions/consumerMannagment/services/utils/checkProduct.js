/************************************************************/
/* This function create input span to check/select products */
/************************************************************/

"use strict";

import {separatorStyle} from "../../../uiMannagment/services/utils/dataSeparator.js"

/* Check if any product is checked for download */
export let anyProductChecked = false;
const downloadProductsPDF = document.getElementById("downloadButton");

/* Check one by one */
export function createCheckbox() {
    const label = document.createElement("label");
    label.classList.add("check-product");

    const customCheckbox = document.createElement("span");
    customCheckbox.classList.add("custom-checkbox");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("styled-checkbox");
    checkbox.name = "checkbox"

    label.appendChild(checkbox);
    label.appendChild(customCheckbox);

    checkbox.addEventListener("change", function() {
        if (this.checked) {
            customCheckbox.classList.add("checked-style");
            anyProductChecked = true;

            /* Download button */
            downloadProductsPDF.disabled = false;
        } else {
            customCheckbox.classList.remove("checked-style");
            anyProductChecked = [...document.querySelectorAll(".styled-checkbox")].some(checkbox => checkbox.checked);

            /* Download button */
            downloadProductsPDF.disabled = true;
        };
    });

    return label;
};

/* Check all */
export function checkAll() {
    const checkboxes = document.querySelectorAll(".styled-checkbox");
    const areAllChecked = [...checkboxes].every((checkbox) => checkbox.checked);

    checkboxes.forEach((checkbox) => {
        const customCheckbox = checkbox.nextElementSibling;

        if (!areAllChecked) {
            checkbox.checked = true;
            customCheckbox.classList.add("checked-style");
        } else {
            checkbox.checked = false;
            customCheckbox.classList.remove("checked-style");
        };
    });

    anyProductChecked = !areAllChecked;

    /* Download button */
    downloadProductsPDF.disabled = !anyProductChecked;
};


/* Obtein the current product information "Checked" */
export function getProductsInformation() {
    const productElements = document.querySelectorAll(".product-list");

    const selectedProductData = [];

    // Iterate through each product element
    productElements.forEach((productElement) => {
        const checkbox = productElement.querySelector(".styled-checkbox");
        if (checkbox.checked) {
            const sku = productElement.querySelector(".sku-product").textContent;
            const productDataElements = productElement.querySelectorAll(".product-data");
            const productInfo = { sku };
    
            // Iterate through each product data element and add it to the productInfo object
            productDataElements.forEach((dataElement, index) => {
                const attributeName = `attribute${index + 1}`;
                const attributeValue = dataElement.textContent;
                productInfo[attributeName] = attributeValue;
            });
    
            // Check if an image exists within this product element
            const imgElement = productElement.querySelector("img");
            if (imgElement) {
                const imageSrc = imgElement.getAttribute("src");
                productInfo.imageSrc = imageSrc;
            };
    
            // Add the product data to the selectedProductData array
            selectedProductData.push(productInfo);
        };
    });
    
    return generatePDF(selectedProductData);
};

/* PDF of produts to download */
export function generatePDF(selectedProductData) {
    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Define the position for the title
    const titleX = 20;
    const titleY = 20;

    // Define the font and style for the title
    pdfDoc.setFont("Arial", "bold");
    pdfDoc.setFontSize(24);

    // Add the title to the PDF
    pdfDoc.text(titleX, titleY, "Selected Products Information");

    // Add an image beside the title
    const imageX = 150;
    const imageY = 13;
    const imageWidth = 40;
    const imageHeight = 17;
    const logoImg = "../../assets/criteria.png";
    pdfDoc.addImage(logoImg, "JPEG", imageX, imageY, imageWidth, imageHeight);

    // Define the position for the product data
    let productDataX = 20;
    let productDataY = 70;

    // Define the font and style for the product data
    pdfDoc.setFont("Arial", "normal");
    pdfDoc.setFontSize(12);

    // Set line height (spacing) between paragraphs/lines
    const lineHeight = 12;

    // Set the line color to light grey
    pdfDoc.setDrawColor(200, 200, 200);

    // Loop through the selected product data and add it to the PDF
    selectedProductData.forEach((productInfo, index) => {
        // Create a string with formatted product information
        let productInfoString = `${productInfo.sku}\n`;

        // Add other product attributes
        for (const key in productInfo) {
            if (key !== "sku") {
                // Check if the value contains an image URL
                if (productInfo[key].includes("http")) {
                    // If it"s an image, prepend "Image:"
                    productInfoString += `Image: ${productInfo[key]}\n`;
                } else {
                    // Otherwise, display the key and value
                    // Split long attribute values into multiple lines
                    const lines = pdfDoc.splitTextToSize(`${productInfo[key]}.`, 180);
                    productInfoString += lines.join("\n") + "\n";
                };
            };
        };

        // Add a light grey horizontal line between products
        const lineY = productDataY - 10;
        if (index > 0) {
            pdfDoc.setLineWidth(0.5);
            pdfDoc.line(20, lineY, 180, lineY);
        };

        // Add formatted text to the PDF
        pdfDoc.text(productDataX, productDataY, productInfoString);

        // Calculate the height of the text block and adjust the Y position
        const textBlockHeight = pdfDoc.getTextDimensions(productInfoString, { fontSize: 12, maxWidth: 140 }).h;
        productDataY += textBlockHeight + lineHeight; // Add line height

        // Add a page break if the content exceeds the page
        if (productDataY > 250) {
            pdfDoc.addPage();
            productDataY = 20;
        };
    });

    // Save the PDF with a filename
    pdfDoc.save("Selected_Products.pdf");
};