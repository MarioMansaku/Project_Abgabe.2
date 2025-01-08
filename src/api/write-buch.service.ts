import log from '../utils/logger';
import axios, { AxiosResponse } from 'axios';
import { operations } from './api'

type PostPayload = operations["BuchWriteController_post"]["requestBody"]["content"]["application/json"];
type PostResponse = operations["BuchWriteController_post"]["responses"]["201"]["content"];
type PutPayload = operations["BuchWriteController_put"]["requestBody"]["content"]["application/json"];
type PutResponse = operations["BuchWriteController_put"]["responses"]["204"]["content"];
type DeleteResponse204 = operations["BuchWriteController_delete"]["responses"]["204"]["headers"];

const BASE_URL = 'https://localhost:3000/rest';
const token = sessionStorage.getItem('authToken');
export class WriteServiceBuch {
    // Sende eine HTTP POST-Anfrage an die API mit den Buchdaten
    async postBuch(buch: PostPayload): Promise<PostResponse | void> {
        const response: AxiosResponse<PostResponse> = await axios.post(BASE_URL, buch, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

        // Überprüfen, ob der Statuscode nicht 201 ist.
        if(response.status !== 201) {
            throw new Error(`Das Buch wurde nicht erfolgreich angelegt. Statuscode: ${response.status}`);
        }
        log.debug("Buch wurde erfolgreich angelegt");
        return response.data;
    };

    // Senden einer HTTP PUT-Anfrage zur Aktualisierung des Buches
    async putBuch(buch: PutPayload, id: number): Promise<PutResponse | void> {
        const url = `${BASE_URL}/${id}`;
        const response: AxiosResponse<PutResponse> = await axios.put(url, buch, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        // Überprüfen, ob der Statuscode nicht 204 ist.
        if(response.status !== 204) {
            throw new Error(`Das Buch wurde nicht erflgreich aktualisiert. Statuscode: ${response.status}`);
        }
        log.debug("Buch wurde erfolgreich aktualisiert");
        return response.data;
    };

    // Senden einer HTTP DELETE-Anfrage zum Löschen des Buches
    async deleteBuch(id: number): Promise<DeleteResponse204 | void> {
        const url = `${BASE_URL}/${id}`;
        const response: AxiosResponse<DeleteResponse204> = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        // Überprüfen, ob der Statuscode nicht 204 ist. 
        if(response.status !== 204) {
            throw new Error(`Das Buch wurde nicht erfolgreich gelöscht. Statuscode:${response.status}`);
        }
        return response.headers;
    }
}


