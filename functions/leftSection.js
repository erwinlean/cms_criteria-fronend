"use strict";

// Obtein the information to show at the DOM
// Token declarado en otra carpeta
const currentUser = JSON.parse(localStorage.getItem('user'));
const currentUserEmail = currentUser.email;

// Files
const getFiles = async () => {
    try {
        const response = await fetch(url + "/users/userFiles", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User-Email': currentUserEmail
            }
        });

        if (response.ok) {
            const receivedInfo = await response.json();
            //console.log("Files: ");
            //console.log(receivedInfo);

            const filesTableHeaders = document.getElementById('tableHeaders');

            filesTableHeaders.innerHTML = '';
            Object.keys(receivedInfo[0]).forEach((key) => {
                const th = document.createElement('th');
                th.textContent = key;
                filesTableHeaders.appendChild(th);
            });

            const filesTableBody = document.getElementById('filesTable').getElementsByTagName('tbody')[0];

            filesTableBody.innerHTML = '';

            receivedInfo.forEach((fileData) => {
                const row = document.createElement('tr');

                Object.keys(fileData).forEach((key) => {
                    const cell = document.createElement('td');
                    cell.textContent = JSON.stringify(fileData[key]);
                    row.appendChild(cell);
                });

                filesTableBody.appendChild(row);
            });
        } else {
            const receivedInfo = await response.json();
            console.log('Error al crear el archivo:', receivedInfo);
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    };
};

const getLogin = async () => {
    try {
        const response = await fetch(url + "/users/userLogins", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User-Email': currentUserEmail
            }
        });

        if (response.ok) {
            const receivedInfo = await response.json();
            const loginDatesList = document.getElementById('loginDatesList');

            loginDatesList.innerHTML = '';

            receivedInfo.loginDates.forEach((loginDate) => {
                const formattedDate = new Date(loginDate).toLocaleString();
                const listItem = document.createElement('li');
                listItem.textContent = "Loggins: " + formattedDate;
                loginDatesList.appendChild(listItem);
            });
        } else {
            const receivedInfo = await response.json();
            console.log('Error al crear el archivo:', receivedInfo);
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    };
};

getLogin();
getFiles();



// Expand the section
const section = document.querySelector("body > div.body-section > div.user");
let expandedLogin = false;
let expandedFiles = false;

const login = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.logins > button > img");
const toExpandLogin = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.logins > div");

const files = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.files > button > img");
const toExpandFiles = document.querySelector("body > div.body-section > div.user > div.infor_pers > div.files > div");

const expandBtn = document.querySelector("body > div.body-section > div.user > div:nth-child(2) > button");
const unExpandBtn = document.querySelector("body > div.body-section > div.user > div:nth-child(3) > button > img");

// Login
function expandLogins() {

    if(expandedLogin ==  false){
        toExpandLogin.style.display = "block";
        expandedLogin = true;    
    }else{
        toExpandLogin.style.display = "none";
        expandedLogin = false;    
    };
};
login.addEventListener("click", expandLogins);

// Files
function expandFiles() {

    if(expandedFiles ==  false){
        toExpandFiles.style.display = "block";
        expandedFiles = true;    
    }else{
        toExpandFiles.style.display = "none";
        expandedFiles = false;    
    };
};

files.addEventListener("click", expandFiles);

// Expand bottom button
function expand() {
    section.style.width = "300px";
    expandBtn.style.display = "none";
    unExpandBtn.style.display = "block"; 
};
function unExpand() {
    section.style.width = "80px";
    expandBtn.style.display = "block";
    unExpandBtn.style.display = "none";
};

expandBtn.addEventListener("click", expand);
unExpandBtn.addEventListener("click", unExpand);