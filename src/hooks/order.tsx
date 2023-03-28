import React, { useState, createContext, ReactNode, useContext, } from "react";

import { api } from '../services/api';
import { useAuth } from './auth';

type OrderData = {
    draft: boolean;
    id: string;
    name?: string;
    status: boolean;
    table: number;
    updated_at: string;
    created_at: string;
}

type OrderContextData = {
    loading: boolean;
    openOrder: (number: string) => Promise<void>;
    orderData: OrderData;
    closeOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

const OrderContext = createContext({} as OrderContextData);

function OrderProvider({ children }: OrderProviderProps) {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<OrderData>({} as OrderData);

    const { user } = useAuth();

    async function openOrder(number: string) {
        setLoading(true);
        try {
            const response = await api.post('/order', { table: Number(number) });

            setOrderData(response.data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw new Error(`Não foi possivel criar a mesa "${error}"`);
        }
    }

    async function closeOrder(order_id: string) {
        setLoading(true);
        try {
            await api.delete(`/order`, {
                params: {
                    order_id: order_id
                }
            });
            setLoading(false);
        } catch (error) {

            setLoading(false);
            throw new Error(`Não foi possivel excluir a mesa "${error}"`);
        }
    }

    return (
        <OrderContext.Provider value={{
            loading,
            openOrder,
            orderData,
            closeOrder
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