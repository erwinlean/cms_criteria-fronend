"use strict";

const registerForm = document.getElementById('register_form');

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