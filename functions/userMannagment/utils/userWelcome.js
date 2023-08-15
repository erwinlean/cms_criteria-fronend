"use strict";

import {user} from "./userData.js";

export function welcomeUser() {
    const welcomeUser = document.getElementById('username');

    if(welcomeUser){
        return welcomeUser.textContent = user.name;
    };  
};