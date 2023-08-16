"use strict";

let expandedUpload = false;
let expandedLogin = false;
let expandedFiles = false;
let expandedCreateUser = false;
let expandedSearchProduct = false;
let all = !(expandedUpload || expandedLogin || expandedFiles || expandedCreateUser || expandedSearchProduct);

const upload = document.querySelector("#upload-section");
const toExpandLogin = document.querySelector("body > div.body-section > div.info-section > div.logins-info");
const toExpandFiles = document.querySelector("body > div.body-section > div.info-section > div.files-info");
const toExpandCreateUser = document.querySelector("#formulario-sign-in");
const toExpandSearchProduct = document.querySelector("body > div.body-section > div.info-section > div.products-by-sku");

// Function to collapse all sections except the specified one
const collapseAllSections = (except) => {
    const sections = [upload, toExpandLogin, toExpandFiles, toExpandCreateUser, toExpandSearchProduct];
    sections.forEach(section => {
        if (section !== except) {
            section.style.display = "none";
        };
    });
};

export const expandUpload = () => {
    expandedUpload = !expandedUpload;
    if (expandedUpload) {
        upload.style.display = "block";
        collapseAllSections(upload);
    } else {
        const allOtherSectionsClosed = [expandedLogin, expandedFiles, expandedCreateUser, expandedSearchProduct].every(expanded => !expanded);
        if (allOtherSectionsClosed) {
            upload.style.display = "block";
        } else {
            upload.style.display = "none";
            checkDisplays();
        };
    };
};

export const expandLogins = () => {
    expandedLogin = !expandedLogin;
    if (expandedLogin) {
        toExpandLogin.style.display = "block";
        collapseAllSections(toExpandLogin);
    } else {
        toExpandLogin.style.display = "none";
        checkDisplays();
    };
};

export const expandFiles = () => {
    expandedFiles = !expandedFiles;
    if (expandedFiles) {
        toExpandFiles.style.display = "block";
        collapseAllSections(toExpandFiles);
    } else {
        toExpandFiles.style.display = "none";
        checkDisplays();
    };
};

export const expandCreateUser = () => {
    expandedCreateUser = !expandedCreateUser;
    if (expandedCreateUser) {
        toExpandCreateUser.style.display = "block";
        collapseAllSections(toExpandCreateUser);
    } else {
        toExpandCreateUser.style.display = "none";
        checkDisplays();
    };
};

export const expandSearchProduct = () => {
    expandedSearchProduct = !expandedSearchProduct;
    if (expandedSearchProduct) {
        toExpandSearchProduct.style.display = "block";
        collapseAllSections(toExpandSearchProduct);
    } else {
        toExpandSearchProduct.style.display = "none";
        checkDisplays();
    };
};

function checkDisplays() {
    if (all === false) {
        if (upload) {
            upload.style.display = "block";
        };
    };
};