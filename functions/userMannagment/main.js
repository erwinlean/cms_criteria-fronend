"use strict";

import { welcomeUser } from "../userMannagment/utils/userWelcome.js";
import { setupProfileForm } from "../userMannagment/userUpdate.js";
import { logOut } from "../userMannagment/utils/logOut.js";
import { tokenHandler } from "../userMannagment/utils/authHandler.js";

const logOutButton = document.querySelector("#logOut");

if (logOutButton) {
    logOutButton.addEventListener('click', logOut);
};

const currentPage = window.location.pathname;
if (currentPage === '/home.html') {
    welcomeUser();
} else if (currentPage === '/perfil.html') {
    welcomeUser();

    /* Update user information function */
    setupProfileForm();
};

tokenHandler();
setupProfileForm();