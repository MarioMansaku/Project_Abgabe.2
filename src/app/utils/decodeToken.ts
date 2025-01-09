import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    preferred_username: string;
    resource_access: {
        [key: string]: {
            roles: string[];
        };
    };
}

export const getUserInfoFromToken = (token: string) => {
    try {
        const decoded: DecodedToken = jwtDecode(token);

        const username = decoded.preferred_username;
        const roles = decoded.resource_access['nest-client']?.roles || [];

        const isAdmin = roles.includes('admin');

        return { username, isAdmin };
    } catch (error) {
        console.error('Failed to decode token:', error);
        return { username: null, isAdmin: false };
    }
};
