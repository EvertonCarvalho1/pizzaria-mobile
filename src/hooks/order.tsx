import React, { useState, createContext, ReactNode, useContext, } from "react";

import { api } from '../services/api';

type OrderData = {
    draft: boolean;
    id: string;
    name?: string;
    status: boolean;
    table: number;
    updated_at: string;
    created_at: string;
}

export type AddItemOrderProps = {
    order_id: string;
    product_id: string;
    amount: number,
    name: string
}

export type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderContextData = {
    loading: boolean;
    openOrder: (number: string) => Promise<void>;
    orderData: OrderData;
    closeOrder: (order_id: string) => Promise<void>;
    addItemOrder: (item: AddItemOrderProps) => Promise<void>;
    items: ItemProps[];
    setItems: (item: ItemProps[]) => void;
    deleteItem: (item_id: string) => Promise<void>;
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

const OrderContext = createContext({} as OrderContextData);

function OrderProvider({ children }: OrderProviderProps) {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<OrderData>({} as OrderData);
    const [items, setItems] = useState<ItemProps[]>([]);

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

    async function addItemOrder(item: AddItemOrderProps) {
        setLoading(true);
        try {
            const response = await api.post(`/order/add`, {
                order_id: item.order_id,
                product_id: item.product_id,
                amount: item.amount
            });

            let data = {
                id: response.data.id,
                product_id: item.product_id as string,
                name: item.name as string,
                amount: item.amount
            }

            setItems(oldArray => [...oldArray, data]);

            setLoading(false);
        } catch (error) {

            setLoading(false);
            throw new Error(`Não foi possivel excluir a mesa "${error}"`);
        }
    }

    async function deleteItem(item_id: string) {
        setLoading(true);
        try {
            await api.delete(`/order/remove`, {
                params: {
                    item_id
                }
            });

            let removeItem = items.filter(item => {
                return (item.id !== item_id)
            });

            setItems(removeItem);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw new Error(`Não foi possivel excluir o item"${error}"`);
        }
    }

    async function finishOrder(order_id: string) {
        setLoading(true);
        try {
            await api.put(`/order/send`, {
                order_id: order_id
            });

            setOrderData({} as OrderData);
            setItems([]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw new Error(`Não foi possivel finalizar pedido"${error}"`);
        }
    }

    return (
        <OrderContext.Provider value={{
            loading,
            openOrder,
            orderData,
            closeOrder,
            addItemOrder,
            items,
            setItems,
            deleteItem,
            finishOrder
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