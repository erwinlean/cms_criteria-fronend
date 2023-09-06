"use strict";

const form = document.getElementById("login_form");

// Check if the current url have the token, if doesnt, return to index
document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const token = getQueryParam("token");

    console.log(token)
    if (!token) {
        window.location.href = "./index.html";
    };
});

// Change the password for new one function
async function resetPassword(event) {
    event.preventDefault();

    const passwordInput = document.getElementById("contraseña");
    const newPasswordInput = document.getElementById("newContraseña");
    const password = passwordInput.value;
    const newPassword = newPasswordInput.value;
    const token = getQueryParam("token");
    const email = getQueryParam("email");
    const urlReset = "https://criteria-providers.onrender.com/api/reset/confirm";

    // Make sure the passwords match
    if (password !== newPassword) {
        Swal.fire({
            icon: "error",
            title: "Error",
            color: "rgb(51, 167, 181)",
            text: "Las contraseñas no son iguales.",
            confirmButtonColor: "rgb(51, 167, 181)",
        });
        return;
    }

    // Construct the request body
    const requestBody = {
        newPassword: password,
        email: email,
    };

    // Send a POST request to your backend
    try {
        const response = await fetch(urlReset, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });
        console.log(requestBody)
        
        if (response.ok) {
            const data = await response.json();

            // Handle the response from the backend here
            if (data.message === "Password reset successful") {
                Swal.fire({
                    icon: "success",
                    iconColor: "green",
                    color: "rgb(51, 167, 181)",
                    title: "Su contraseña fue cambiada.",
                    text: `Cambio éxitoso ${email}`,
                    confirmButtonColor: "rgb(51, 167, 181)",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    color: "rgb(51, 167, 181)",
                    text: "Error al cambiar la contraseña.",
                    confirmButtonColor: "rgb(51, 167, 181)",
                });
            }
        } else {
            throw new Error("Password reset request failed");
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            color: "rgb(51, 167, 181)",
            text: "Error al cambiar la contraseña.",
            confirmButtonColor: "rgb(51, 167, 181)",
        });
    }
}

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

document.addEventListener("submit", resetPassword);