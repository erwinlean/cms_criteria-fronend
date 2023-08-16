"use strict";

export function tokenHandler() {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    if (!tokenExpiration || new Date().getTime() > parseInt(tokenExpiration)) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    };
};