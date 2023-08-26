"use strict";

import { transformData } from '../schema/schemaFile.js';
import { products } from '../functions/convertFiles.js';
import { fetchUserFiles } from '../../uiMannagment/services/usersData.js';

export async function postFile () {
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.email;

    const fileData = {
        fileName: "test_file",
        brand: "pepito",
        data: transformData(products),
        userUpload: userEmail, // Must be email for admin or provider for access the info
    };

    try {
        const response = await fetch('http://localhost:8080/api/files/create'/*"https://vast-ruby-elk-kilt.cyclic.app/api/files/create"*/, {
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

            fetchUserFiles();
        } else if (response.status === 403) {
            alert('No tienes permiso para crear archivos');
        } else {
            const errorData = await response.json();
            console.error('Error al crear el archivo:', errorData);
            
            alert('Error al crear el archivo. Por favor, inténtalo de nuevo más tarde.');
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    };
};