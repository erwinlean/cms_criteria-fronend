"use strict";

import { loginsDisplay, filesDisplay } from "./dataDisplay.js";

const currentUser = JSON.parse(localStorage.getItem("user"));
const currentUserEmail = currentUser.email;  // Must be email for admin or provider for access the info

//const url = "http://localhost:8080/api";
const url = "https://vast-ruby-elk-kilt.cyclic.app/api";
const token = localStorage.getItem("token");

export const fetchUserFiles = async () => {
    const currentUserEmail = currentUser.email;

    try {
        const response = await fetch(`${url}/files`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUserEmail
            }
        });

        if (response.ok) {
            const data =  await response.json();
            const res = filesDisplay(data)

            return res;
        } else {
            const receivedInfo = await response.json();
            console.log("Error while fetching user files:", receivedInfo);
        };
    } catch (error) {
        console.log("Error in request:", error);
    };
};

export const fetchUserLogins = async () => {

    try {
        const response = await fetch(`${url}/users/userLogins`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUserEmail
            }
        });0

        if (response.ok) {
            const data =  await response.json();
            const res = loginsDisplay(data);

            return res;
        } else {
            const receivedInfo = await response.json();
            console.log("Error while fetching user logins:", receivedInfo);
        };
    } catch (error) {
        console.log("Error in request:", error);
    };
};