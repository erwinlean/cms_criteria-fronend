"use strict";

import { emailValidator } from "../userMannagment/utils/validator.js";
import { displayErrorAlert } from "../userMannagment/utils/displayUsers.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login_form");
    const emailInput = document.getElementById("email");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const resetRequest = "https://criteria-providers.onrender.com/api/reset/password";

        // Capture the value of the email
        const email = emailInput.value;

        // Validate the form inputs using the imported formInputValidator function
        if (!emailValidator(email)) {
            return displayErrorAlert("Email incorrecto.");
        };

        fetch(resetRequest, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                return response.json();
            } else {
                throw new Error("Respuesta no válida");
            };
        })
        .then((data) => {
            Swal.fire({
                icon: "success",
                iconColor: "green",
                color: "rgb(51, 167, 181)",
                title: "Petición Enviada",
                text: `Petición enviada con éxito a ${email}`,
                confirmButtonColor: "rgb(51, 167, 181)",
            });
        })
        .catch((error) => {
            displayErrorAlert("Error al enviar la petición");
        });
    });
});