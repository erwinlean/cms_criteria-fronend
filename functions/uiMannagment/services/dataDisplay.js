"use strict";

import {formatAndDisplayDates} from "../services/utils/datesHandler.js";
import {separatorStyle} from "../services/utils/dataSeparator.js";

export function loginsDisplay(loginsData) {
    const loginDatesList = document.getElementById("loginDatesList");
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const isAdmin = loggedInUser.role === "admin";

    loginsData.loginDates.forEach((userData) => {
        const email = isAdmin ? userData.email : userData.email || loggedInUser.email;
        const dates = isAdmin ? userData.loginDates : (userData || []);

        const userItem = document.createElement("li");
        userItem.classList.add("login-item");

        const nameEmailElement = document.createElement("strong");
        nameEmailElement.textContent = isAdmin ? email : `${loggedInUser.name} (${email})`;

        const datesElement = document.createElement("span");
        datesElement.innerHTML = isAdmin ? formatAndDisplayDates(dates.join(', ')) : formatAndDisplayDates(dates);

        userItem.appendChild(nameEmailElement);
        userItem.appendChild(datesElement);

        loginDatesList.appendChild(userItem);
    });
};

export function filesDisplay(filesData) {
    const filesTable = document.getElementById("filesTable").getElementsByTagName('tbody')[0];

    filesData.forEach(file => {
        const row = filesTable.insertRow();

        const fileNameCell = row.insertCell();
        fileNameCell.textContent = file.fileName;

        const brandCell = row.insertCell();
        brandCell.textContent = file.brand;

        const uploadDateCell = row.insertCell();
        uploadDateCell.textContent = new Date(file.uploadDate).toLocaleString();

        const userUploadCell = row.insertCell();
        userUploadCell.textContent = file.userUpload;

        const dataCell = row.insertCell();

        if (Array.isArray(file.data)) {
            const attributesText = file.data.map(item => {
                const attributeText = Object.entries(item.attributes).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null && 'data' in value) {
                        return `${key}: ${value.data}`;
                    };

                    return `${key}: ${value[0].data}`;
                }).join('<br>');
        
                return `Identifier: ${item.identifier},<br> Attributes: ${attributeText}`;
            }).join(separatorStyle());
            
            dataCell.innerHTML = attributesText;
        };
    });
};