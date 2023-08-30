"use strict";

export function emailValidator(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
        return false; // Invalid email format
    };

    // Check for potentially malicious input
    const maliciousPatterns = [
        /script:/i,  // Prevent JavaScript injection
        /onload=/i,  // Prevent onload attribute
        /<\s*img/i   // Prevent image injection
    ];

    for (const pattern of maliciousPatterns) {
        if (pattern.test(email)) {
            return false;
        };
    };

    return true;
};