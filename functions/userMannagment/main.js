"use strict";

import { welcomeUser } from "../userMannagment/utils/userWelcome.js"
import { setupProfileForm } from "../userMannagment/userUpdate.js"
import { logOut } from "../userMannagment/utils/logOut.js"

const logOutButton = document.querySelector("#logOut");

if (logOutButton) {
    logOutButton.addEventListener('click', logOut);
};

const currentPage = window.location.pathname;
if (currentPage === '/home.html') {
    welcomeUser();
} else if (currentPage === '/perfil.html') {
    setupProfileForm();
};