'use-client';

import { WriteServiceBuch } from '@/api/write-buch.service';
import { useState } from 'react';
import log from '../utils/logger.js';

interface AdminDeleteButtonProps {
    id: number;
    onDeleteSuccess: () => void;
}

export function AdminDeleteButton({
    id,
    onDeleteSuccess,
}: AdminDeleteButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const writeService = new WriteServiceBuch();

    const handleDelete = async () => {
        if (!id) {
            throw new Error('ID nicht verfügbar');
        }

        setIsLoading(true);

        try {
            await writeService.deleteBuch(id);
            log.debug(`Buch mit der ID ${id} wurde erfolgreich gelöscht.`);
            onDeleteSuccess();
        } catch (error) {
            log.error(
                `Fehler beim Löschen des Buches mit der ID ${id}: ${error}`,
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Löschen...' : 'Buch löschen'}
            </button>
        </div>
    );
}
