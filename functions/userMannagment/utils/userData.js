"use strict";

export function user() {
    let user = JSON.parse(localStorage.getItem('user'));

    return user;
};