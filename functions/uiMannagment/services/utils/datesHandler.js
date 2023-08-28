"use strict";

export function formatAndDisplayDates(dateString) {
    const dateStrings = dateString.split(", ");
    const formattedDates = dateStrings.map((dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    });

    return formattedDates + " ";
};

export function formatDates() {
    const spans = document.querySelectorAll("#loginDatesList > li > span");
    if (spans) {
        spans.forEach((span) => {
            // Replace ", " with " - " for each span element
            span.textContent = span.textContent.replace(/, /g, ' - ');
            span.textContent = span.textContent.replace(/,/g, ' ');
        });
    };
};