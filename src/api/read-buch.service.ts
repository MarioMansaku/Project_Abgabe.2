import axios from 'axios';
import log from '../utils/logger.js';

// Diese Funktion holt ein Buch basierend auf bestimmten Kriterien
export const getBuch = async (criteria: string, value: string) => {
    log.debug('getBuch: criteria=%s, value=%s', criteria, value);

    try {
        const res = await axios.get(`https://localhost:3000/rest`, {
            params: { [criteria]: value },
            headers: {
                Accept: "application/hal+json",
            },
        });

        log.debug('getBuch: Erfolgreich', res.data);
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 404) {
                const message = "Kein Buch entspricht den eingegebenen Suchkriterien.";
                log.error(`API Error: ${message} (Status Code: ${status})`);
                throw new Error(message);
            } else if (status !== undefined && status >= 500) {
                const message = "Es ist ein Fehler auf unserer Seite aufgetreten. Bitte versuchen Sie es später erneut.";
                log.error(`API Error: ${message} (Status Code: ${status})`);
                throw new Error(message);
            }
        } else {
            log.error('Unbekannter Fehler:', error);
            throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
        }
    }
};

