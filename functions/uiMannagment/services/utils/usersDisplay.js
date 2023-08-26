"use strict";

let createUserVisible = true;
let deleteUserVisible = false;

const createUserBtn = document.querySelector("#createUser");
const deleteUserBtn = document.querySelector("#deleteUser");

const createUserSection = document.querySelector("#userMannagment > div.form-container");
const deleteUserSection = document.querySelector("#userMannagment > div.users-list");

// Function to toggle the visibility of the user sections
export function userSection() {
    createUserBtn.addEventListener("click", () => {
        createUserVisible = true;
        deleteUserVisible = false;

        createUserSection.style.display = "block";
        deleteUserSection.style.display = "none";
    });

    deleteUserBtn.addEventListener("click", () => {
        createUserVisible = false;
        deleteUserVisible = true;

        createUserSection.style.display = "none";
        deleteUserSection.style.display = "block";
    });

    // Set the default section to be displayed
    createUserSection.style.display = "block";
    deleteUserSection.style.display = "none";
};