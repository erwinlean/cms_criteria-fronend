"use strict";

export function transformElement(element) {
    if (typeof element.sku !== 'string') {
        element.sku = String(element.sku);
    };
    for (const key in element) {
        if (element.hasOwnProperty(key) && typeof element[key] === 'string') {
            element[key] = element[key].replace(/,|\./g, '');
        };
    };

    return element;
};

export function transformSkuTable(value) {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value).replace(/,|\./g, '');
    };
    return value;
};