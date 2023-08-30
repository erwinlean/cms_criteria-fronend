"use strict";

export async function getProduct() {
    
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userRole = user ? user.role : null;
        //const apiUrl = 'http://localhost:8080/api/consumer';
        const apiUrl = "https://vast-ruby-elk-kilt.cyclic.app/api/consumer";
        const token = localStorage.getItem('token');

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User-role': userRole, // Must be admin or consumer for access the info
            }
        });

        if (response.ok) {
            const res = await response.json();

            return res
        } else {
            const errorData = await response.json();
        };
    } catch (error) {
    };
};