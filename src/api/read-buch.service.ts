import axios from 'axios';
import log from '../utils/logger.js';

export const getBuch = async (criteria: string) => {
    log.debug('getBuch: criteria=%s', criteria);

    try {
        const res = await axios.get(`https://localhost:3000/rest?${criteria}`, {
            headers: {
                Accept: "application/hal+json",
            },
        });

        return res.data; // Axios automatically parses JSON response
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.status === 404
                ? "Buch nicht gefunden"
                : "Fehler bei Fetch";
            log.error(`API Error: ${message} (Status Code: ${error.response?.status})`);
            throw new Error(message);
    }
 }
}
