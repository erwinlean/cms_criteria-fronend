"use strict";

import { userSection } from "./utils/usersDisplay.js";

let expandedUpload = true;
let expandedLogin = false;
let expandedFiles = false;
let expandedCreateUser = false;
let expandedSearchProduct = false;

const upload = document.querySelector("#upload-section");
const toExpandLogin = document.querySelector("body > div.body-section > div.info-section > div.logins-info");
const toExpandFiles = document.querySelector("body > div.body-section > div.info-section > div.files-info");
const toExpandUsers = document.querySelector("#userMannagment");
const toExpandSearchProduct = document.querySelector("body > div.body-section > div.info-section > div.products-by-sku");

// Function to collapse all sections except the specified one
const collapseAllSections = (except) => {
    const sections = [upload, toExpandLogin, toExpandFiles, toExpandUsers, toExpandSearchProduct];
    sections.forEach(section => {
        if (section !== except) {
            section.style.display = "none";
        }
    });
};

export const expandUpload = () => {
    expandedUpload = true;
    expandedLogin = false;
    expandedFiles = false;
    expandedCreateUser = false;
    expandedSearchProduct = false;
    
    upload.style.display = "block";
    collapseAllSections(upload);
};

export const expandLogins = () => {
    expandedUpload = false;
    expandedLogin = true;
    expandedFiles = false;
    expandedCreateUser = false;
    expandedSearchProduct = false;

    toExpandLogin.style.display = "block";
    collapseAllSections(toExpandLogin);
};

export const expandFiles = () => {
    expandedUpload = false;
    expandedLogin = false;
    expandedFiles = true;
    expandedCreateUser = false;
    expandedSearchProduct = false;

    toExpandFiles.style.display = "block";
    collapseAllSections(toExpandFiles);
};

export const expandCreateUser = () => {
    expandedUpload = false;
    expandedLogin = false;
    expandedFiles = false;
    expandedCreateUser = true;
    expandedSearchProduct = false;

    toExpandUsers.style.display = "block";

    // Sub-sections
    userSection();

    collapseAllSections(toExpandUsers);
};

export const expandSearchProduct = () => {
    expandedUpload = false;
    expandedLogin = false;
    expandedFiles = false;
    expandedCreateUser = false;
    expandedSearchProduct = true;

    toExpandSearchProduct.style.display = "block";
    collapseAllSections(toExpandSearchProduct);
};