"use strict";

//Capture elements from DOM
const input = document.getElementById("input");

let products = [];

const convert_file_to_json = (event) => {

    //Testing time
    console.time("convert time")

    let loadedFile = event.target.files[0];

    // Clear products
    let products = [];

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
                products.push(file_traduced);
            });

            console.log(products);

            console.timeEnd("convert time");
        };
    };
};

//Execute json convert
input.addEventListener("change", convert_file_to_json)