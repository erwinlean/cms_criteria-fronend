"use strict";

import { displayUsers } from "../userMannagment/utils/displayUsers.js"

const registerForm = document.getElementById('register_form');
const url = "https://vast-ruby-elk-kilt.cyclic.app/api/users/create";

registerForm.addEventListener('submit', function(event) {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserEmail = user.email;

    event.preventDefault();

    const name = registerForm.elements.name.value;
    const apellido = registerForm.elements.apellido.value;
    const email = registerForm.elements.email.value;
    const password = registerForm.elements.password.value;
    const reenterPassword = registerForm.elements['re-enter_password'].value;
    const empresa = registerForm.elements.empresa.value;
    const role = registerForm.elements.role.value;

    if (password !== reenterPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            confirmButtonColor: "rgb(51, 167, 181)",
            text: 'Las contraseñas no coinciden',
        });

        return;
    };

    const data = {
        name: name,
        lastName: apellido,
        email: email,
        password: password,
        brand: empresa,
        role: role
    };

    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "User-Email": currentUserEmail
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        registerForm.reset();

        Swal.fire({
            icon: 'success',
            iconColor: "green",
            title: 'Usuario Creado',
            titleColor:"rgb(51,167,181)",
            color: "rgb(51,167,181)",
            confirmButtonColor: "rgb(51, 167, 181)",
            text: `Usuario ${data.user.email} creado.`,
        });

        displayUsers();
    })
    .catch(err => {
        Swal.fire({
            icon: "error",
            iconColor: "rgb(240,128,104)",
            title: "Error",
            text: "Error al crear el usuario verifique los datos y vuelva a intentarlo.",
            confirmButtonColor: "rgb(51, 167, 181)"
        });
    });
});