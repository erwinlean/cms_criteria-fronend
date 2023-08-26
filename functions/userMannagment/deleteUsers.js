"use strict";

import { displayUsers, displayAlert } from "./utils/displayUsers.js";
import { deleteUser } from "./utils/usersRequest.js";

// Entry point
document.addEventListener("DOMContentLoaded", () => {
    displayUsers();

// hacer el la captura manual, no con evento

    // Event listener for delete button
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-button")) {
            const userEmail = event.target.getAttribute("data-email");

            // Utiliza displayAlert con un callback
            displayAlert(userEmail, (confirmed) => {
                if (confirmed) {
                    deleteUser(userEmail);
                };
            });
        };
    });
});