"use strict";

import { transformData } from '../schema/schemaFile.js';
import { products } from '../functions/convertFiles.js';

export async function postFile () {
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.email;

    const fileData = {
        fileName: "test_file",
        brand: "pepito",
        data: transformData(products),
        userUpload: userEmail,
    };

    try {

        const response = await fetch(/*'http://localhost:8080/api/files/create'*/ "https://vast-ruby-elk-kilt.cyclic.app/api/files/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(fileData),
        });

        if (response.ok) {
            const createdFile = await response.json();
            alert('Archivo creado:', createdFile);

            getFiles();
        } else {
            const errorData = await response.json();
            console.log('Error al crear el archivo:', errorData);
        };
    } catch (error) {
        console.log('Error en la solicitud:', error);
    };
};