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
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMTjJBRnQ4TzEyeVVPS1hmSElQUmlVeEloREZMLTFkQmJnc2psZjNiancwIn0.eyJleHAiOjE3MzYyODkzMzYsImlhdCI6MTczNjI4NzUzNiwianRpIjoiOTFkZDlhMTctM2ZkMS00ZWEyLTk0MjQtOGZkNTc1ZmQzMzRlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4ODgwL3JlYWxtcy9uZXN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjgyYWJkNTNkLTAyMzktNDY2Yi05ZTZkLWE2YTg3MjIzNmNjMiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im5lc3QtY2xpZW50Iiwic2lkIjoiZGRlMDUyMWMtMjAxNC00ODgxLTkzN2UtYjgyMzllYzQxMDdmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2xvY2FsaG9zdDozMDAwIiwiaHR0cHM6Ly9vYXV0aC5wc3Rtbi5pbyIsImh0dHBzOi8vYnVjaDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1uZXN0Il19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibmVzdC1jbGllbnQiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik5lc3QgQWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJOZXN0IiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWNtZS5jb20ifQ.HMhV_8uUOR7iJySxQQHVToJctR9tjdSl_ENUDPlGrXNJFFtHaQopnxVESvk23cSwdzqakzrLLdO8X9M36mj3mOmv_tjyIXl-B6IOL9oZzV1JppUPaqo8pIZbKqtmopyF8UtSUX2yojh9UIYPUbsqIlZ2ivoMGEajzyOslUyEYMFVQ2oJyfVmlo-22zw_UoYeplsF22B49I9I0bKAjNetaw7o-OJ6j5ZWFJBnGcu2qtHl0WiUsVwcUOap4xAtWci-YNFtJkptB442sz2boShhe3pI6qzgK7nVG51GazqNTpKOcqdXi6FT-1ovVUOopOS2HkLhxG8cjaOsDjg9eVo_vw"
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


