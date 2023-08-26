"use strict";

export function separatorStyle(){
    return "<br>"+`<div style="border-bottom: 1px solid #ccc; margin: 10px 0;"></div>`;
};

export function replaceLoginsText(text) {
    let count = 0;
    
    const newText = text.replace(/,([^,]*)/g, (match, group) => {
        count++;
        if (count % 2 === 0) {
            return `${separatorStyle()}${group}`;
        } else {
            return ` - ${group}`;
        };
    });

    return newText;
};