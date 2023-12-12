import React, { useEffect } from 'react';
import { useUser } from './UserContext';

const UserAuthenticator = ({ children }) => {
    const { updateUser } = useUser();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        console.log('userbil', storedUser);

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            updateUser(parsedUser);
        }
    }, []); // Bağımlılık dizisi boş bırakıldı

    return <>{children}</>;
};

export default UserAuthenticator;
