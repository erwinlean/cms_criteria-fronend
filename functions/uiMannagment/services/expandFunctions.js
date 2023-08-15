"use strict";

let expandedLogin = false;
let expandedFiles = false;

const upload = document.querySelector("#upload-section");
const uploadBtn = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.upload > button");

const toExpandLogin = document.querySelector("body > div.body-section > div.info-section > div.logins-info");
const toExpandFiles = document.querySelector("body > div.body-section > div.info-section > div.files-info");

export const expandUpload = () => {
    upload.style.display = "block";
    toExpandLogin.style.display = "none";
    toExpandFiles.style.display = "none";
};

export const expandLogins = () => {
    if (expandedLogin == false) {
        toExpandLogin.style.display = "block";
        upload.style.display = "none";
        toExpandFiles.style.display = "none";
        expandedLogin = true;
    } else {
        toExpandLogin.style.display = "none";
        upload.style.display = "none";
        expandedLogin = false;
        expandUpload();
    }
};

export const expandFiles = () => {
    if (expandedFiles == false) {
        toExpandFiles.style.display = "block";
        upload.style.display = "none";
        toExpandLogin.style.display = "none";
        expandedFiles = true;
    } else {
        toExpandFiles.style.display = "none";
        upload.style.display = "none";
        expandedFiles = false;
        expandUpload();
    }
};

uploadBtn.addEventListener("click", expandUpload);