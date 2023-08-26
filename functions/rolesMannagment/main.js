"use strict";

import {rolesAdministration} from "./services/rolesDisplay.js";

const currentUserRole = JSON.parse(localStorage.getItem("user"));

function rolesDisplay(role) {
    return rolesAdministration(role.role);
};

rolesDisplay(currentUserRole);