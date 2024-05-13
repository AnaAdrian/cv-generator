import React from 'react';

export function checkValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatDateTime(date) {
    const options = {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(new Date(date));

    return formattedDate;
}

export function isCustomComponent(element) {
    return (
        typeof element.type === 'function' ||
        (typeof element.type === 'object' && React.isValidElement(element))
    );
}
