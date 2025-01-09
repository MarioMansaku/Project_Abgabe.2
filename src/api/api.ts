export interface paths {
    '/rest/{id}': {
        parameters: {
            query?: never;
            header?: {
                'If-None-Match'?: string;
            };
            path?: {
                id: string;
            };
            cookie?: never;
        };

        get: {
            operationID: 'BuchGetController_getById';
            summary: 'Suche mit der Buch-ID';
            parameters: {
                header: {
                    'If-None-Match'?: string;
                };
                path: {
                    id: string;
                };
            };
            requestBody?: never;
            responses: {
                200: {
                    header: {
                        ETag: string;
                    };
                    content: {
                        'application/hal+json': {
                            id: number;
                            titel: string;
                            [key: string]: unknown;
                        };
                    };
                };

                304: {
                    header: {
                        [name: string]: unknown; // No Body, only Headers
                    };
                };

                404: {
                    description: 'Die Buch-ID ist ungültig oder das Buch existiert nicht';
                    content: {
                        'application/hal+json': {
                            error: string;
                        };
                    };
                };

                406: {
                    description: 'Nicht akzeptabler Inhaltstyp';
                };
            };
        };
        /** Ein vorhandenes Buch aktualisieren */
        put: operations['BuchWriteController_put'];
        post?: never;
        /** Buch mit der ID löschen */
        delete: operations['BuchWriteController_delete'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/rest': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Suche mit Suchkriterien */
        get: operations['BuchGetController_get'];
        put?: never;
        /** Ein neues Buch anlegen */
        post: operations['BuchWriteController_post'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/token': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Access Token zu Benutzername und Passwort */
        post: operations['TokenController_token'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/refresh': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Refresh für vorhandenen Token */
        post: operations['TokenController_refresh'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/dev/db_populate': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** DB neu laden */
        post: operations['DevController_dbPopulate'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        TitelDTO: {
            /** @example Der Titel */
            titel: string;
            /** @example Der Untertitel */
            untertitel: string;
        };
        AbbildungDTO: {
            /** @example Die Beschriftung */
            beschriftung: string;
            /** @example image/png */
            contentType: string;
        };
        BuchDTO: {
            /** @example 978-0-007-00644-1 */
            isbn: string;
            /** @example 5 */
            rating: number;
            /** @example EPUB */
            art: string;
            /** @example 1 */
            preis: number;
            /** @example 0.1 */
            rabatt: number;
            /** @example true */
            lieferbar: boolean;
            /** @example 2021-01-31 */
            datum: Record<string, never>;
            /** @example https://test.de/ */
            homepage: string;
            /** @example [
             *       "JAVASCRIPT",
             *       "TYPESCRIPT",
             *       "JAVA",
             *       "PYTHON"
             *     ] */
            schlagwoerter: Record<string, never>;
            titel: components['schemas']['TitelDTO'];
            abbildungen: components['schemas']['AbbildungDTO'][];
        };
        BuchDtoOhneRef: {
            /** @example 978-0-007-00644-1 */
            isbn: string;
            /** @example 5 */
            rating: number;
            /** @example EPUB */
            art: string;
            /** @example 1 */
            preis: number;
            /** @example 0.1 */
            rabatt: number;
            /** @example true */
            lieferbar: boolean;
            /** @example 2021-01-31 */
            datum: Record<string, never>;
            /** @example https://test.de/ */
            homepage: string;
            /** @example [
             *       "JAVASCRIPT",
             *       "TYPESCRIPT",
             *       "JAVA",
             *       "PYTHON"
             *     ] */
            schlagwoerter: Record<string, never>;
        };
        TokenData: {
            /** @example admin */
            username: string;
            /** @example p */
            password: string;
        };
        Refresh: {
            /** @example alg.payload.signature */
            refresh_token: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    HealthController_live: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The Health Check is successful */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @example ok */
                        status?: string;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        info?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {} */
                        error?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        details?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        };
                    };
                };
            };
            /** @description The Health Check is not successful */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @example error */
                        status?: string;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        info?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {
                         *       "redis": {
                         *         "status": "down",
                         *         "message": "Could not connect"
                         *       }
                         *     } */
                        error?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       },
                         *       "redis": {
                         *         "status": "down",
                         *         "message": "Could not connect"
                         *       }
                         *     } */
                        details?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        };
                    };
                };
            };
        };
    };
    HealthController_ready: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The Health Check is successful */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @example ok */
                        status?: string;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        info?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {} */
                        error?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        details?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        };
                    };
                };
            };
            /** @description The Health Check is not successful */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        /** @example error */
                        status?: string;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       }
                         *     } */
                        info?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {
                         *       "redis": {
                         *         "status": "down",
                         *         "message": "Could not connect"
                         *       }
                         *     } */
                        error?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        } | null;
                        /** @example {
                         *       "database": {
                         *         "status": "up"
                         *       },
                         *       "redis": {
                         *         "status": "down",
                         *         "message": "Could not connect"
                         *       }
                         *     } */
                        details?: {
                            [key: string]: {
                                status: string;
                            } & {
                                [key: string]: unknown;
                            };
                        };
                    };
                };
            };
        };
    };
    PrometheusController_metrics: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BuchGetController_getById: {
        parameters: {
            query?: never;
            header?: {
                /** @description Header für bedingte GET-Requests, z.B. "0" */
                'If-None-Match'?: string;
            };
            path: {
                /** @description Z.B. 1 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Das Buch wurde gefunden */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Das Buch wurde bereits heruntergeladen */
            304: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Kein Buch zur ID gefunden */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BuchWriteController_put: {
        parameters: {
            query?: never;
            header?: {
                /** @description Header für optimistische Synchronisation */
                'If-Match'?: string;
            };
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['BuchDtoOhneRef'];
            };
        };
        responses: {
            /** @description Erfolgreich aktualisiert */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Fehlerhafte Buchdaten */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Kein Token mit ausreichender Berechtigung vorhanden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Falsche Version im Header "If-Match" */
            412: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Header "If-Match" fehlt */
            428: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BuchWriteController_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Das Buch wurde gelöscht oder war nicht vorhanden */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Kein Token mit ausreichender Berechtigung vorhanden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BuchGetController_get: {
        parameters: {
            query?: {
                isbn?: string;
                rating?: number;
                art?: string;
                preis?: number;
                rabatt?: number;
                lieferbar?: boolean;
                datum?: string;
                homepage?: string;
                javascript?: string;
                typescript?: string;
                titel?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Eine evtl. leere Liste mit Büchern */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    BuchWriteController_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['BuchDTO'];
            };
        };
        responses: {
            /** @description Erfolgreich neu angelegt */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Fehlerhafte Buchdaten */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Kein Token mit ausreichender Berechtigung vorhanden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    TokenController_token: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/x-www-form-urlencoded': components['schemas']['TokenData'];
                'application/json': components['schemas']['TokenData'];
            };
        };
        responses: {
            /** @description Erfolgreich eingeloggt. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Benutzername oder Passwort sind falsch. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    TokenController_refresh: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/x-www-form-urlencoded': components['schemas']['Refresh'];
                'application/json': components['schemas']['Refresh'];
            };
        };
        responses: {
            /** @description Erfolgreich aktualisiert. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Ungültiger Token. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    DevController_dbPopulate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Die DB wurde neu geladen */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Kein Token mit ausreichender Berechtigung vorhanden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
