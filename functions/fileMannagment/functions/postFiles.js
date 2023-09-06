"use strict";

import { transformData } from "../schema/schemaFile.js";
import { products } from "../functions/convertFiles.js";
import { fetchUserFiles } from "../../uiMannagment/services/usersData.js";

export async function postFile () {
    
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.email;

    const fileData = {
        fileName: "Test",
        brand: user.brand,
        data: transformData(products),
        userUpload: userEmail, // Must be email for admin or provider for access the info
    };

    try {
        const response = await fetch(/*"http://localhost:8080/api/files/create"*/"https://criteria-providers.onrender.com/api/files/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fileData),
        });

        if (response.ok) {
            const createdFile = await response.json();
            
            Swal.fire({
                icon: "success",
                iconColor: "green",
                color: "rgb(51, 167, 181)",
                title: "Archivo enviado",
                text: "El archivo se ha enviado con éxito.",
                confirmButtonColor: "rgb(51, 167, 181)"
            });

            fetchUserFiles();
        } else if (response.status === 403) {
            Swal.fire({
                icon: "warning",
                iconColor: "rgb(240,128,104)",
                title: "Acceso denegado",
                text: "No tienes permiso para crear archivos.",
                confirmButtonColor: "rgb(51, 167, 181)"
            });
        } else {
            const errorData = await response.json();
            
            Swal.fire({
                icon: "error",
                title: "Error",
                iconColor: "rgb(240,128,104)",
                text: "Error al crear el archivo. Por favor, inténtalo de nuevo más tarde.",
                confirmButtonColor: "rgb(51, 167, 181)"
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            iconColor: "rgb(240,128,104)",
            title: "Error",
            text: "Error al crear el archivo. Por favor, inténtalo de nuevo más tarde.",
            confirmButtonColor: "rgb(51, 167, 181)"
        });
    };
};