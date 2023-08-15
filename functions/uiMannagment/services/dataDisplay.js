"use strict";

export function loginsDisplay(loginsData) {
    console.log(loginsData)
    console.log(typeof(loginsData))

    const loginDatesList = document.getElementById("loginDatesList");

    loginsData.loginDates.forEach((user) => {
        const email = user.email;
        const dates = user.loginDates;

        const userItem = document.createElement("li");
        userItem.innerHTML = `<strong>${email}</strong>: ${dates.join(", ")}`;
        
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
            const dataText = file.data.map(item => `${item.label} (${item.brand})`).join(', ');
            dataCell.textContent = dataText;
        } else if (typeof file.data === 'object') {
            const dataText = Object.entries(file.data).map(([key, value]) => `${key}: ${value}`).join(', ');
            dataCell.textContent = dataText;
        };
    });
};