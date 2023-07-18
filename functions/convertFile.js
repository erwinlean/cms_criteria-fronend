"use strict";

//Capture elements from DOM
const input = document.getElementById("input");
const sendBtn = document.getElementById("btn")

let products = [];

const convert_file_to_json = (event) => {

    let loadedFile = event.target.files[0];

    // Clear products
    products = [];

    //Convert xlsx to json
    if(loadedFile){
        let file_reader = new FileReader();
        file_reader.readAsBinaryString(loadedFile);

        file_reader.onloadend = (event)=>{
            let data = event.target.result;;
            let workbook = XLSX.read(data, {
                type : "binary"
            });
            workbook.SheetNames.forEach(sheet =>{
                let file_traduced = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                products = file_traduced;
            });
            
        };
    };
};

async function sendFile () {
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.email;

    console.log("Archivo enviado por: " + userEmail);
    console.log(products)

    const fileData = {
        fileName: "test_file",
        brand: "pepito",
        data: products,
        userUpload: userEmail,
    };

    console.log(fileData)

// Comented hasta que funcione la limpieza del xlsx
    //try {
//
    //    const response = await fetch('http://localhost:8080/api/files/create', {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json',
    //            'Authorization': `Bearer ${token}`
    //        },
    //        body: JSON.stringify(fileData),
    //    });
//
    //    if (response.ok) {
    //        const createdFile = await response.json();
    //        console.log('Archivo creado:', createdFile);
    //    } else {
    //        const errorData = await response.json();
    //        console.log('Error al crear el archivo:', errorData);
    //    };
    //} catch (error) {
    //    console.log('Error en la solicitud:', error);
    //};
};

//Execute json convert
input.addEventListener("change", convert_file_to_json);

// Send file
sendBtn.addEventListener("click", sendFile);