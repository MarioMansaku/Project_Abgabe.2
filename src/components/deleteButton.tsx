"use-client";

import React, { useState } from "react";
import { WriteServiceBuch } from "@/api/write-buch.service";
import log from '../utils/logger.js';

interface AdminDeleteButtonProps {
    id: number;  // Prop für die ID
    onDeleteSuccess: () => void;  // Callback, der nach dem erfolgreichen Löschen aufgerufen wird
}

export function AdminDeleteButton({ id, onDeleteSuccess }: AdminDeleteButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const writeService = new WriteServiceBuch(); 

    const handleDelete = async () => {
        if (!id) {
            throw new Error("ID nicht verfügbar");
        }

        setIsLoading(true);

        try {
            await writeService.deleteBuch(id);  // Lösche das Buch anhand der ISBN
            log.debug(`Buch mit der ID ${id} wurde erfolgreich gelöscht.`);
            onDeleteSuccess();  // Callback nach erfolgreichem Löschen
        } catch (error) {
            log.error(`Fehler beim Löschen des Buches mit der ID ${id}: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? "Löschen..." : "Buch löschen"}
            </button>
        </div>
    );
}
