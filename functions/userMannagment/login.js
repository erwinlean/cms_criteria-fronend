"use strict";

const url = "http://localhost:8080/api";

const loginForm = document.getElementById('login_form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginForm.elements.email.value;
    const password = loginForm.elements.password.value;

    //console.log('Datos de inicio de sesión:');
    //console.log('Email:', email);
    //console.log('Password:', password);

    //Contact to the backend
    const data = {
        email: email,
        password: password
    };

    axios.post(`${url}/users/login`, data)
    .then(res => {
        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        window.location.href = 'home.html';
    })
    .catch(err => {
        console.error(err);
    });
});