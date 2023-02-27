import React, { useState, createContext, ReactNode, useContext, } from "react";

import { api } from '../services/api';
import { useAuth } from './auth';

type OrderContextData = {
    loading: boolean;
    openOrder: (number: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

const OrderContext = createContext({} as OrderContextData);

function OrderProvider({ children }: OrderProviderProps) {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    async function openOrder(number: string) {
        setLoading(true);
        try {
            const response = await api.post('/order', { table: Number(number) });

            console.log('minha resposta', response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw new Error(`Não foi possivel criar a mesa "${error}"`);
        }
    }

    return (
        <OrderContext.Provider value={{
            loading,
            openOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
}

function useOrder() {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error('useOrder must be used within a AuthProvider');
    }

    return context;
}

export {
    OrderProvider,
    useOrder
}