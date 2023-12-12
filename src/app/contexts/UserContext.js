//UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const logout = () => {
        // Kullanıcı çıkış yaptığında localStorage'deki kullanıcı bilgisini temizle
        localStorage.removeItem('user');
        // Kullanıcı bilgisini sıfırla
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
