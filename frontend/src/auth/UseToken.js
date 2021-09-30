import { useState } from 'react';

function useToken () {
    const [token, setTokeninternal] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        localStorage.setItem('token', newToken);
        setTokeninternal(newToken);
    }

    return [token, setToken];
}

export default useToken;
