import log from '../utils/logger.js'
import axios from 'axios'
import { BuchDto } from '@/models/buchDto.js';
import { validateInput } from '@/utils/validateInput.js';

const BASE_URL = 'https://localhost:3000/rest';

export class BuchWriteService {
    /**
    * Neues Buch anlegen.
    * @param bookData The raw book data from the frontend.
    * @param token The authorization token.
    */
}
