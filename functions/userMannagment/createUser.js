"use strict";

const registerForm = document.getElementById('register_form');
const url ="https://vast-ruby-elk-kilt.cyclic.app/api";

registerForm.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const name = registerForm.elements.name.value;
    const apellido = registerForm.elements.apellido.value;
    const email = registerForm.elements.email.value;
    const reenterPassword = registerForm.elements['re-enter_password'].value;
    const password = registerForm.elements.password.value;
    const empresa = registerForm.elements.empresa.value;
    const role = registerForm.elements.role.value;

    //console.log('Datos de registro:');
    //console.log('Nombre:', name);
    //console.log('Apellido:', apellido);
    //console.log('Email:', email);
    //console.log('Password:', password);
    //console.log('Empresa:', empresa);
    //console.log('Role:', role);

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

    fetch(`${url}/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        const user = data.user;
        const tokenExpiration = new Date().getTime() + 2 * 60 * 60 * 1000;

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', tokenExpiration);
        //localStorage.setItem('user', JSON.stringify(user));
        //window.location.href = 'home.html';
        
        registerForm.reset();

        alert("Usuario " + data.user.email + " creado.")
    })
    .catch(err => {
        console.error(err);
    });
});