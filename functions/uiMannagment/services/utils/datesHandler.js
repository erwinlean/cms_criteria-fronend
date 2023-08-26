"use strict";

export function formatAndDisplayDates(dateString) {
    const dateStrings = dateString.split(", ");
    const formattedDates = dateStrings.map((dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    });

    return formattedDates + " ";
};

export function formatAndDisplayTwoDates(dates) {
    console.log(dates)
    
    if (dates.tagName === 'SPAN') {
        // Replace ", " with " "
        dates.textContent = dates.textContent.replace(/, /g, ' ');
    };

    return dates;
}
