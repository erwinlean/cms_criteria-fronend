import { getCurrentUserEmail } from "./data.js";

export const fetchUserFiles = async (url, token) => {
    const currentUserEmail = getCurrentUserEmail();

    try {
        const response = await fetch(`${url}/users/userFiles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUserEmail
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            const receivedInfo = await response.json();
            console.log("Error while fetching user files:", receivedInfo);
        };
    } catch (error) {
        console.log("Error in request:", error);
    };
};

export const fetchUserLogins = async (url, token) => {
    const currentUserEmail = getCurrentUserEmail();

    try {
        const response = await fetch(`${url}/users/userLogins`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "User-Email": currentUserEmail
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            const receivedInfo = await response.json();
            console.log("Error while fetching user logins:", receivedInfo);
        };
    } catch (error) {
        console.log("Error in request:", error);
    };
};