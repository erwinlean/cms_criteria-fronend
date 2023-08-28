"use strict";

import { fetchUserFiles } from '../../uiMannagment/services/usersData.js';
import { logOut } from "../../userMannagment/utils/logOut.js";

const getUrl = "https://vast-ruby-elk-kilt.cyclic.app/api/users/users";
const deleteUrl = "https://vast-ruby-elk-kilt.cyclic.app/api/users/delete";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

// Get
export async function getUsers() {
    const currentUser = user.email

    try {
        const response = await fetch(getUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUser
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`);
        };
        const data = await response.json();

        return await data;
    } catch (error) {
        console.error("Error fetching users:", error);
    };
};

// Delete
export async function deleteUser(emailToDelete) {
    const currentUser = user.email

    try {
        const response = await fetch(`${deleteUrl}/${emailToDelete}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUser
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to delete user: ${response.status}`);
        };

        console.log(currentUser)
        console.log(emailToDelete)

        if(currentUser == emailToDelete){
            logOut();
        };

        // Actualizes the files, if the user is deleted, then delete the files of the user to.
        fetchUserFiles(); 
        const data = await response.json();
    } catch (error) {
        console.error(`Error deleting user: ${emailToDelete}`, error);
        throw error;
    };
};