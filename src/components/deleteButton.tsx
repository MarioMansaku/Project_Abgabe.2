"use-client"

import React, { useState } from "react";
import { WriteServiceBuch } from "@/api/write-buch.service";
import log from '../utils/logger.js';

export function AdminDeleteButton(){
    const [buchId, setBuchId] = useState<number | ''>('');
    const writeService = new WriteServiceBuch(); 

    const handleDelete = async () => {
        if(!buchId) {
            throw new Error("Bitte geben Sie Buch-ID ein.")
        }
        await writeService.deleteBuch(Number(buchId));
        log.debug(`Buch mit der ID ${buchId} wurde erfolgreich gelöscht.`);
        setBuchId('');
    }
}