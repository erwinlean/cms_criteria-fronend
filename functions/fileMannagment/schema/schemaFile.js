"use strict";

import { transformElement } from "./utils/schemaHelpers.js";

export function transformData(jsonData) {
    const transformedData = [];

    // forEach json need to be converted to the dataToBackend schema
    jsonData.forEach((element, index) => { 
        const sku = transformElement(element.sku)

        if(index !== 0){
            const dataToBackend = {
                "identifier": sku,
                "attributes": { // Add more atributes if you want to
                                // Add email and user that upload the file
                    description:
                        [
                            {
                                locale: null,
                                scope: null,
                                data: element.description
                            }
                        ],
                    atr_articulo: [{
                        "data": element.label,
                        "locale": null,
                        "scope": null
                    }]
                }
                //category: is ignored, no needed it provided directly in the backend
            };
            
            transformedData.push(dataToBackend);
        };
    });

    return transformedData;
};