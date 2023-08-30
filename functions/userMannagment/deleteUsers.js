"use strict";

import { displayUsers, displayAlert } from "./utils/displayUsers.js";
import { deleteUser } from "./utils/usersRequest.js";

// Entry point
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        displayUsers();
    }, 1000);

    // Event listener for delete button
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-button")) {
            const userEmail = event.target.getAttribute("data-email");

            // Utiliza displayAlert con un callback
            displayAlert(userEmail, (confirmed) => {
                if (confirmed) {
                    deleteUser(userEmail);

                    Swal.fire({
                        icon: 'success',
                        iconColor:"green",
                        title: 'Usuario Eliminado',
                        color: "rgb(51, 167, 181)",
                        confirmButtonColor: "rgb(51, 167, 181)",
                        text: `El usuario ${userEmail} ha sido eliminado.`,
                    });

                    // Display again the current users accounts
                    displayUsers();
                };
            });
        };
    });
});