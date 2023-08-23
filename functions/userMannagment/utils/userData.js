"use strict";

export function userData() {
    let user = JSON.parse(localStorage.getItem('user'));

    return user;
};