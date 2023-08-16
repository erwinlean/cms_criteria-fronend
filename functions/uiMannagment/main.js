"use strict";

import { fetchUserFiles, fetchUserLogins } from "../uiMannagment/services/fetchFunctions.js";
import { expandUpload, expandLogins, expandFiles, expandCreateUser, expandSearchProduct } from "../uiMannagment/services/expandFunctions.js";

const index = document.querySelector("body > div.body-section > div.user > div > div.upload > button");
const login = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.logins > button");
const files = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.files > button ");
const createUserButton = document.querySelector("body > div.body-section > div.user > div > div.create-user > button");
const searchProductButton = document.querySelector("body > div.body-section > div.user > div > div.search-products > button");

if (index) {
    index.addEventListener("click",expandUpload);
};

if (login) {
    login.addEventListener("click", expandLogins);
};

if (files) {
    files.addEventListener("click", expandFiles);
};

if (createUserButton) {
    createUserButton.addEventListener("click", expandCreateUser);
};

if (searchProductButton) {
    searchProductButton.addEventListener("click", expandSearchProduct);
};

fetchUserLogins();
fetchUserFiles();