"use strict";

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const getCurrentUserEmail = () => {
    const currentUser = getCurrentUser();
    return currentUser ? currentUser.email : null;
};