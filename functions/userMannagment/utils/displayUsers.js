"use strict";

import { getUsers } from "./usersRequest.js";
const user = JSON.parse(localStorage.getItem("user"));

export async function displayUsers() {
    if(user.role === "admin"){
        const table = document.getElementById("usersTable");
        
        // Remove all rows except the first one (header)
        while (table.rows.length > 1) {
            table.deleteRow(1);
        };

        const users = await getUsers();

        users.forEach((user) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);

            cell1.textContent = user.email;
            cell2.textContent = user.brand;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.textContent = "x";
            deleteButton.setAttribute("data-email", user.email);
            cell3.appendChild(deleteButton);
        });
    };
};

export function displayAlert(userEmail, callback) {
    Swal.fire({
        title: 'Confirmar Eliminacion',
        text: `¿Desea eliminar a ${userEmail}?`,
        icon: 'warning',
        iconColor: "red",
        color:"rgb(51,167,181)",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'rgb(51,167,181)',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            if (callback) {
            callback(true);
            }
        } else {
            if (callback) {
                callback(false);
            };
        };
    });
};

export function displayErrorAlert(message, callback) {
    Swal.fire({
        icon: "error",
        iconColor: "rgb(240,128,104)",//"rgb(51, 167, 181)",
        title: "Error",
        text: message,
        confirmButtonText: "OK",
        color: "rgb(51, 167, 181)",
        confirmButtonColor: "rgb(51, 167, 181)",
        customClass: {
            popup: "my-custom-popup-class",
        },
    }).then((result) => {
        if (result.isConfirmed && callback) {
            callback();
        };
    });
};