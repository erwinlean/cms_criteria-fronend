"use strict";

const url = "http://localhost:8080/api";
//Forms show and exit
const login = document.getElementById('login');
const register = document.getElementById('sign_in');
const form_login = document.getElementById('formulario-login');
const form_register = document.getElementById('formulario-sign-in');


login.addEventListener('click', function() {
    mostrarFormulario('login');
});
register.addEventListener('click', function() {
    mostrarFormulario('sign_in');
});


function mostrarFormulario(formulario) {
    if (formulario === 'login') {
        form_login.style.display = 'block';
        form_register.style.display = 'none';
    } else if (formulario === 'sign_in') {
        form_login.style.display = 'none';
        form_register.style.display = 'block';
    };
};

// Capture data from forms
const loginForm = document.getElementById('login_form');
const registerForm = document.getElementById('register_form');

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

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = registerForm.elements.name.value;
    const apellido = registerForm.elements.apellido.value;
    const email = registerForm.elements.email.value;
    const reenterPassword = registerForm.elements['re-enter_password'].value;
    const password = registerForm.elements.password.value;
    const empresa = registerForm.elements.empresa.value;

    //console.log('Datos de registro:');
    //console.log('Nombre:', name);
    //console.log('Apellido:', apellido);
    //console.log('Email:', email);
    //console.log('Password:', password);
    //console.log('Empresa:', empresa);

    if (password !== reenterPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const data = {
        name: name,
        apellido: apellido,
        email: email,
        password: password,
        empresa: empresa
    };
    axios.post(`${url}/users/create`, data)
        .then(res => {
            
            const token = res.data.token;
            const user = res.data.user;
    
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'home.html';
            
            registerForm.reset();
        })
    .catch(err => {
            console.error(err);
    });
});