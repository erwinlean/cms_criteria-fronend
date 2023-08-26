"use strict";

import {formatAndDisplayDates, formatAndDisplayTwoDates } from "../services/utils/datesHandler.js";
import {separatorStyle, replaceLoginsText} from "../services/utils/dataSeparator.js";
import {openModalData} from "../services/utils/modalFile.js";

export function loginsDisplay(loginsData) {
    const loginDatesList = document.getElementById("loginDatesList");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const isAdmin = loggedInUser.role === "admin";

    loginsData.loginDates.forEach((userData) => {
        const email = isAdmin ? userData.email : userData.email || loggedInUser.email;
        const dates = isAdmin ? userData.loginDates : (userData || []);
        const userItem = document.createElement("li");
        userItem.classList.add("login-item");
        const nameEmailElement = document.createElement("strong");
        nameEmailElement.textContent = isAdmin ? email : `${loggedInUser.name} (${email})`;
        const datesElement = document.createElement("span");
    
        if (dates.length <= 2) {
            const dateModified = formatAndDisplayDates(dates.join(", "));
            datesElement.innerHTML = dateModified;

            // Display with better style the first two dates not working.
            //formatAndDisplayTwoDates(dateModified); function at datesHandler

        } else {
            const firstTwoDates = formatAndDisplayDates(dates.slice(0, 2).join(", "));
            const verMasButton = document.createElement("button");
            verMasButton.textContent = "[ Ver Más ]";

            verMasButton.addEventListener("click", () => {
                const modalDates = document.getElementById("modal-dates-1");    
                modalDates.innerHTML = "";
                        
                const allDates = formatAndDisplayDates(dates.join(", "));
                const datesWithLineBreaks = replaceLoginsText(allDates.toString());
            
                modalDates.innerHTML = datesWithLineBreaks;
                
                const modal = document.getElementById("modal");
                modal.style.display = "block";
            
                const closeBtn = document.querySelector(".close-1");
                closeBtn.addEventListener("click", () => {
                    modal.style.display = "none";
                });
            
                window.addEventListener("click", (event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            });
            
    
            // Create a div element with the specified style
            const separatorDiv = document.createElement("div");
            separatorDiv.style.borderBottom = "1px solid #ccc";
            separatorDiv.style.margin = "10px 0";
    
            datesElement.appendChild(document.createTextNode(firstTwoDates + " "));
            datesElement.appendChild(separatorDiv);
            datesElement.appendChild(verMasButton);
        };
    
        userItem.appendChild(nameEmailElement);
        userItem.appendChild(datesElement);
        loginDatesList.appendChild(userItem);
    });
};

export function filesDisplay(filesData) {
    const filesTable = document.getElementById("filesTable").getElementsByTagName("tbody")[0];

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
    
        if (Array.isArray(file.data) && file.data.length > 0) {
            const item = file.data[0];
    
            const attributeText = Object.entries(item.attributes).map(([key, value]) => {
                if (typeof value === "object" && value !== null && "data" in value) {
                    return `${key}: ${value.data}`;
                };
    
                return `${key}: ${value[0].data}`;
            }).join("<br>");
        
            dataCell.innerHTML = `Identifier: ${item.identifier},<br> Attributes: ${attributeText}${separatorStyle()}<span class="more-data" style="cursor: pointer; color: rgb(51,167,181);">[ Ver más ]</span>`;
    
            const moreDataSpan = dataCell.querySelector(".more-data");
            moreDataSpan.addEventListener("click", () => {
                document.body.classList.add("modal-open");
                openModalData(file);

                const fileData = document.querySelector("#fileInfoTable > tr:nth-child(5) > td:nth-child(2)");
                fileData.innerHTML = formatAndDisplayDates(fileData.textContent);
            });
        };
    });
};