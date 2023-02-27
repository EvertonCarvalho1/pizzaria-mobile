import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from '../services/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {

        async function getUSer() {
            const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');

            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser(hasUser);
            }

            setLoading(false);
        }

        getUSer();
    }, [])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/session', { email, password });

            const data = {
                ...response.data,
            }

            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data));

            console.log(response.data.token)

            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

            setUser(response.data);

            setLoadingAuth(false);
        } catch (error) {
            console.log('erro ao acessar', error);
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: '',
                })
            })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            loadingAuth,
            loading,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
}

export {
    AuthProvider,
    useAuth
}