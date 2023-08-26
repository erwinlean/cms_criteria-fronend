"use strict";

export function rolesAdministration(role) {
    // Sections
    const uploadSection = document.querySelector("#upload-section");
    const loginsSection = document.querySelector("body > div.body-section > div.info-section > div.logins-info");
    const filesSections = document.querySelector("body > div.body-section > div.info-section > div.files-info");
    const usersSection = document.querySelector("#userMannagment")
    const productsSection = document.querySelector("body > div.body-section > div.info-section > div.products-by-sku");
    
    // Buttons
    const uploadsBtn = document.querySelector("body > div.body-section > div.user > div > div.upload > button");
    const loginsBtn = document.querySelector("body > div.body-section > div.user > div > div.logins > button");
    const filesBtn = document.querySelector("body > div.body-section > div.user > div > div.files > button");
    const usersBtn = document.querySelector("body > div.body-section > div.user > div > div.create-user > button");
    const productsBtn = document.querySelector("body > div.body-section > div.user > div > div.search-products > button");

    // Hide all sections and buttons by default
    uploadSection.style.display = "none";
    loginsSection.style.display = "none";
    filesSections.style.display = "none";
    usersSection.style.display = "none";
    productsSection.style.display = "none";
    uploadsBtn.style.display = "none";
    loginsBtn.style.display = "none";
    filesBtn.style.display = "none";
    usersBtn.style.display = "none";
    productsBtn.style.display = "none";

    if (role == "admin") {
        // Only display the first section, the other will be displayed when is clicked on the left-section
        uploadSection.style.display = "block";

        uploadsBtn.style.display = "block";
        loginsBtn.style.display = "block";
        filesBtn.style.display = "block";
        usersBtn.style.display = "block";
        productsBtn.style.display = "block";
    } else if (role == "provider") {
        uploadSection.style.display = "block";
        
        uploadsBtn.style.display = "block";
        loginsBtn.style.display = "block";
        filesBtn.style.display = "block";
    } else {
        productsSection.style.display = "block";

        productsBtn.style.display = "block";
    };
};