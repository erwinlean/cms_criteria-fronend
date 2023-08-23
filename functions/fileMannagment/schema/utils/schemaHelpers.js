"use strict";

function transformElement(element) {
    if (typeof element.sku !== 'string') {
        element.sku = String(element.sku);
    };

    for (const key in element) {
        if (element.hasOwnProperty(key) && typeof element[key] === 'string') {
            element[key] = element[key].replace(/,|\./g, ''); // Remove commas and periods
        };
    };

    return element;
};