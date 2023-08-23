"use strict";

export function transformData(jsonData) {
    const transformedData = [];

    // forEach json need to be converted to the dataToBackend schema
    jsonData.forEach((element, index) => { 

        if (typeof element.sku !== 'string') {
            element.sku = String(element.sku);
        };

        if(index !== 0){
            const dataToBackend = {
                "identifier": element.sku,
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