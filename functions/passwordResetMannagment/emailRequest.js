"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login_form");
    const emailInput = document.getElementById("email");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Capture the value of the email
        const email = emailInput.value;

        //fetch("/tu/endpoint/de/backend", {
        //    method: "POST",
        //    headers: {
        //        "Content-Type": "application/json"
        //    },
        //    body: JSON.stringify({ email: email })
        //})
        //.then(response => response.json())
        //.then(data => {
        Swal.fire({
                icon: "success",
                iconColor: "green",
                color: "rgb(51, 167, 181)",
                title: "Petición Enviada",
                text: `Petición enviada con éxito a ${email}`,
                confirmButtonColor: "rgb(51, 167, 181)"
            });
        //})
        //.catch(error => {
        //    //console.error("Error al enviar la petición:", error);
        //    Swal.fire({
        //        icon: "error",
        //        title: "Error",
        //        color: "rgb(51, 167, 181)",
        //        text: "Error al enviar la petición",
        //        confirmButtonColor: "rgb(51, 167, 181)"
        //    });
        //});
    });
});