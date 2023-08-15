"use strict";

export function welcomeUser() {

    const welcomeUser = document.querySelector("#username");
    const user = JSON.parse(localStorage.getItem("user"));

    if(welcomeUser){
        return welcomeUser.textContent = user.name;
    };  
};