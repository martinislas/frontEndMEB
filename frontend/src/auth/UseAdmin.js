import { useState, useEffect } from 'react';
import { useToken } from './UseToken';

function useAdmin () {
    const [token] = useToken();

    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload));
    }

    const [admin, setAdmin] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setAdmin(null);
        } else {
            setAdmin(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}

export default useAdmin;
