"use strict";

import { user } from "../userMannagment/utils/userData.js";

export function setupProfileForm (){

    const url = "http://localhost:8080/api";

    const formUpdateUser = document.getElementById('user_information');

    // perfil.html
    if (formUpdateUser) {
        formUpdateUser.elements.name.placeholder = user.name;
        formUpdateUser.elements.apellido.placeholder = user.lastName;
        formUpdateUser.elements.email.placeholder = user.email;
        formUpdateUser.elements.password.placeholder = 'Ingrese su password actual';
        formUpdateUser.elements['new-password'].placeholder = 'Ingrese su nuevo password';
        formUpdateUser.elements['re-enter_new_password'].placeholder = 'Confirme su nuevo password';
        formUpdateUser.elements.empresa.placeholder = user.brand;

        // Put/Update user information
        formUpdateUser.addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const name = form.elements.name.value;
            const lastName = form.elements.apellido.value;
            const email = form.elements.email.value;
            const password = form.elements.password.value;
            const newPassword = form.elements['new-password'].value;
            const confirmNewPassword = form.elements['re-enter_new_password'].value;
            const brand = form.elements.empresa.value;

            if (newPassword !== confirmNewPassword) {
                alert('El nuevo password no coincide con la confirmación');
                return;
            };

            const updatedFields = {};
            if (name) {
                updatedFields.name = name;
            };
            if (lastName) {
                updatedFields.lastName = lastName;
            };
            if (newPassword) {
                updatedFields.password = newPassword;
            };
            if (brand) {
                updatedFields.brand = brand;
            };

            try {
                const token = localStorage.getItem('token');
                const currentUser = JSON.parse(localStorage.getItem('user'));
                const currentUserEmail = currentUser.email;

                const response = await fetch(`${url}/users/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ email: currentUserEmail, ...updatedFields }),
                });
                if (response.ok) {
                    const data = await response.json();

                    // Update localStorage with the new information on the DOM
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    const updatedUser = { ...currentUser, ...data };
                    console.log(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));   

                    user = JSON.parse(localStorage.getItem('user'));
                    formUpdateUser.elements.name.placeholder = user.name;
                    formUpdateUser.elements.apellido.placeholder = user.lastName;
                    formUpdateUser.elements.email.placeholder = user.email;
                    formUpdateUser.elements.password.placeholder = 'Ingrese su password actual';
                    formUpdateUser.elements['new-password'].placeholder = 'Ingrese su nuevo password';
                    formUpdateUser.elements['re-enter_new_password'].placeholder = 'Confirme su nuevo password';
                    formUpdateUser.elements.empresa.placeholder = user.brand;
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                };
            } catch (error) {
                console.log(error);
            };        
        });
    };
};