import React, { createContext, useContext, useState } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el hook para consumir el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Creamos el Provider que contendrá la lógica
export const AuthProvider = ({ children }) => {
    // Intentamos obtener el usuario del localStorage al cargar la app
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
            return null;
        }
    });

    // isAuthenticated será true si hay un objeto 'user', y false si es null
    const isAuthenticated = !!user;

    // Función de login: actualiza el estado y guarda en localStorage
    const login = (userData) => {
        // Asumimos que userData es un objeto, como { name: 'Ernesto', email: '...' }
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    // Función de logout: limpia el estado y el localStorage
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // El objeto 'value' que se compartirá con los componentes hijos
    const value = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

