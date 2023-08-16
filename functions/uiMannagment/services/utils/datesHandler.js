"use strict";

export function formatAndDisplayDates(dateString) {
    const dateStrings = dateString.split(', ');
    const formattedDates = dateStrings.map((dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    });

    return formattedDates.join('<br>');
}