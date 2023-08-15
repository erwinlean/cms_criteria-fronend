"use strict";

export function logOut(){
    const logOutButton = document.querySelector("#logOut");

    logOutButton.addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        window.location.href = 'index.html';
    });
};