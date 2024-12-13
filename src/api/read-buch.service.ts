import log from '../utils/logger.js';

export const getBuch = async (criteria: string) => {
    log.debug('getBuch: criteria=%s', criteria);
    const res = await fetch(`https://localhost:3000/rest?${criteria}`, {
        method: "GET",
        headers: {
            Accept: "application/hal+json",
        },
    });

    if (!res.ok) {
        const message = res.status === 404 ? "Buch nicht gefunden" : "Fehler bei Fetch";
        log.error(`API Error: ${message} (Status Code: ${res.status})`);
        throw new Error(message);
    }

    return res.json();
};