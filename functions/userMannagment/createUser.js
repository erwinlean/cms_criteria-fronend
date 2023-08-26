"use strict";

import { displayUsers } from "../userMannagment/utils/displayUsers.js"

const registerForm = document.getElementById('register_form');
const url ="https://vast-ruby-elk-kilt.cyclic.app/api/users/create";

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
        alert('Las contraseñas no coinciden');

        return;
    };

    const data = {
        name: name,
        apellido: apellido,
        email: email,
        password: password,
        empresa: empresa,
        role: role
    };

    console.log(data)
    console.log(currentUserEmail)

    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "User-Email": currentUserEmail // Must be email for admin for access the info
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        //const token = data.token;
        //const user = data.user;
        //const tokenExpiration = new Date().getTime() + 2 * 60 * 60 * 1000;

        //localStorage.setItem('token', token);
        //localStorage.setItem('tokenExpiration', tokenExpiration);
        //localStorage.setItem('user', JSON.stringify(user));
        //window.location.href = 'home.html';
        
        registerForm.reset();

        alert("Usuario " + data.user.email + " creado.")

        displayUsers();
    })
    .catch(err => {
        console.error(err);
    });
});