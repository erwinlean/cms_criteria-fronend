"use strict";

const getUrl = "https://vast-ruby-elk-kilt.cyclic.app/api/users/getusers";
const deleteUrl = "https://vast-ruby-elk-kilt.cyclic.app/api/users/deleteuser";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const currentUser = user.email;

// Get
export async function getUsers() {
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
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
    };
};

// Delete
export async function deleteUser(emailToDelete) {
    console.log(`User deleted: ${emailToDelete}`);

    try {
        const response = await fetch(`${deleteUrl}/${emailToDelete}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUser,
            },
            body: JSON.stringify({ email: emailToDelete })
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.status}`);
        };

        console.log(`User deleted: ${emailToDelete}`);
    } catch (error) {
        console.error(`Error deleting user: ${emailToDelete}`, error);
        throw error;
    };
};