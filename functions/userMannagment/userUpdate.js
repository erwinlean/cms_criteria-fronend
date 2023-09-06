"use strict";

import { userData } from "../userMannagment/utils/userData.js";
import { welcomeUser } from "./utils/userWelcome.js";

export function setupProfileForm () {
    welcomeUser();

    const url = "https://criteria-providers.onrender.com/api";
    // const url = "http://localhost:8080/api";

    const formUpdateUser = document.getElementById("user_information");
    let user = userData();

    // perfil.html
    if (formUpdateUser) {
        formUpdateUser.elements.name.placeholder = user.name;
        formUpdateUser.elements.apellido.placeholder = user.lastName;
        formUpdateUser.elements.email.placeholder = user.email;
        formUpdateUser.elements.password.placeholder = "Ingrese su password actual";
        formUpdateUser.elements["new-password"].placeholder = "Ingrese su nuevo password";
        formUpdateUser.elements["re-enter_new_password"].placeholder = "Confirme su nuevo password";
        formUpdateUser.elements.empresa.placeholder = user.brand;

        // Put/Update user information
        formUpdateUser.addEventListener("submit", async function (event) {
            event.preventDefault();

            const form = event.target;
            const name = form.elements.name.value;
            const lastName = form.elements.apellido.value;
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            const newPassword = form.elements["new-password"].value;
            const confirmNewPassword = form.elements["re-enter_new_password"].value;
            const brand = form.elements.empresa.value;

            if (newPassword !== confirmNewPassword) {
                alert("El nuevo password no coincide con la confirmación");
                return;
            };

            const updatedFields = {};
            if (name) {
                updatedFields.name = name;
            };
            if (lastName) {
                updatedFields.lastName = lastName;
            };
            if (email) {
                updatedFields.email = email;
            }
            if (password) {
                updatedFields.oldPassword = password;
            }
            if (newPassword) {
                updatedFields.password = newPassword;
            };
            if (brand) {
                updatedFields.brand = brand;
            };

            // Use SweetAlert2 to display a confirmation dialog
            Swal.fire({
                title: "Confirmar cambios",
                text: "¿Seguro que desea actualizar los cambios?",
                icon: "question",
                iconColor: "rgb(51, 167, 181)",
                color: "rgb(51, 167, 181)",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                confirmButtonColor: "rgb(51, 167, 181)",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "rgb(240,128,104)"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const token = localStorage.getItem("token");
                        const currentUser = JSON.parse(localStorage.getItem("user"));
                        const currentUserEmail = currentUser.email;

                        const response = await fetch(`${url}/users/update`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                                "User-Email": currentUserEmail
                            },
                            body: JSON.stringify({ ...updatedFields }),
                        });
                        if (response.ok) {
                            const data = await response.json();

                            // Update localStorage with the new information on the DOM
                            const currentUser = JSON.parse(localStorage.getItem("user"));
                            const updatedUser = { ...currentUser, ...data };

                            localStorage.setItem("user", JSON.stringify(updatedUser));

                            user = JSON.parse(localStorage.getItem("user"));
                            formUpdateUser.elements.name.placeholder = user.name;
                            formUpdateUser.elements.apellido.placeholder = user.lastName;
                            formUpdateUser.elements.email.placeholder = user.email;
                            formUpdateUser.elements.password.placeholder = "Ingrese su password actual";
                            formUpdateUser.elements["new-password"].placeholder = "Ingrese su nuevo password";
                            formUpdateUser.elements["re-enter_new_password"].placeholder = "Confirme su nuevo password";
                            formUpdateUser.elements.empresa.placeholder = user.brand;

                            Swal.fire("Actualizado!", "Tu perfil fue actualizado.", "success");
                        } else {
                            const errorData = await response.json();
                            Swal.fire("Error", "Error actualizando tu perfil.", "error");
                        };
                    } catch (error) {
                        Swal.fire("Error", "Error actualizando tu perfil.", "error");
                    };
                }
            });
        });
    };
};