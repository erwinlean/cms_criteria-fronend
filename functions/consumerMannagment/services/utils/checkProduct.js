/********************************************/
/* Select products, and download in new PDF */
/********************************************/
"use strict";

export let anyProductChecked = false;
const downloadProductsPDF = document.getElementById("downloadButton");

/************************************************************/
/* This functions create input span to check/select products*/
/************************************************************/

/* Single product selection */
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

/* Check all the products*/
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


/****************************************************/
/* Obtein the current product information "Checked" */
/****************************************************/
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
    
            productDataElements.forEach((dataElement, index) => {
                const attributeName = `attribute${index + 1}`;
                const attributeValue = dataElement.textContent;
                productInfo[attributeName] = attributeValue;
            });
    
            const imgElement = productElement.querySelector("img");
            if (imgElement) {
                const imageSrc = imgElement.getAttribute("src");
                productInfo.imageSrc = imageSrc;
            };
    
            selectedProductData.push(productInfo);
        };
    });
    
    return requestPDF(selectedProductData);
};

/************************************************************/
/* Send PDF request to backend that returns the as Data uri */
/************************************************************/
async function requestPDF(data) {
    const url = "https://criteria-providers.onrender.com/api/pdf/create";
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        };

        const responseData  = await response.json();
        const pdfDataUri = responseData.pdfDataUri;

        downloadPDF(pdfDataUri);

        Swal.fire({
            icon: "success",
            iconColor: "green",
            color: "rgb(51, 167, 181)",
            title: "PDF Creado",
            text: `Productos de PDF creados con éxito`,
            confirmButtonColor: "rgb(51, 167, 181)"
        });
        
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            color: "rgb(51, 167, 181)",
            text: "Error al crear PDF",
            confirmButtonColor: "rgb(51, 167, 181)"
        });
    };
};

/*****************************/
/* Download the pdf function */
/*****************************/
function downloadPDF(pdfUri){
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUri;
    downloadLink.download = 'ProductosSeleccionados.pdf';
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
};