import log from '../utils/logger';
import axios, { AxiosResponse } from 'axios';
import { operations } from './api'

type PostPayload = operations["BuchWriteController_post"]["requestBody"]["content"]["application/json"];
type PostResponse = operations["BuchWriteController_post"]["responses"]["201"]["content"];
// type PutPayload = operations["BuchWriteController_put"]["requestBody"]["content"]["application/json"];
// type PutResponse = operations["BuchWriteController_put"]["responses"]["204"]["content"];


const BASE_URL = 'https://localhost:3000/rest';

export class WriteServiceBuch {
    async postBuch(buch: PostPayload): Promise<PostResponse | void> {
        try {
            const response: AxiosResponse<PostResponse> = await axios.post(BASE_URL, buch, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.status === 201) {
                log.debug("Book good");
                return response.data;
            }

        } catch (error: any) {
            log.debug("Book bad")
            throw error;
        }
    };
}


