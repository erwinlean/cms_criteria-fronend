"use strict";

import { fetchUserFiles, fetchUserLogins } from "../uiMannagment/services/fetchFunctions.js";
import { expandUpload, expandLogins, expandFiles } from "../uiMannagment/services/expandFunctions.js";

const url = "http://localhost:8080/api";
const token = localStorage.getItem("token");

const login = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.logins > button > img");
const files = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.files > button > img");

if (login) {
    login.addEventListener("click", expandLogins);
};

if (files) {
    files.addEventListener("click", expandFiles);
};


fetchUserLogins();
fetchUserFiles();