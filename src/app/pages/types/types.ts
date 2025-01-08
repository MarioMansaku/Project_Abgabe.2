export interface Book {
    id: number;
    isbn: string;
    rating: number;
    art: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    schlagwoerter: string[] | null;
    titel: {
        titel: string;
        untertitel: string;
    };
    _links: {
        self: {
            href: string;
        };
    };
}
