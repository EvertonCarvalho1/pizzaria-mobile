import React, { useState, createContext, ReactNode, useContext, } from "react";

import { api } from '../services/api';
import { useAuth } from './auth';

export type ProductsData = {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    created_at: string;
    updated_at: string;
    category_id: string;
}

type ProductsContextData = {
    loading: boolean;
    productsData: ProductsData[];
    productsSelected: ProductsData;
    setProductsSelected: (products: ProductsData) => void;
    loadProducts: (category_id: string) => Promise<void>
}

type ProductsProviderProps = {
    children: ReactNode;
}

const ProductsContext = createContext({} as ProductsContextData);

function ProductsProvider({ children }: ProductsProviderProps) {
    const [loading, setLoading] = useState(false);
    const [productsData, setProductsData] = useState<ProductsData[] | []>([]);
    const [productsSelected, setProductsSelected] = useState<ProductsData>({} as ProductsData);

    async function loadProducts(category_id: string) {
        setLoading(true);

        try {
            const response = await api.get('/category/product', {
                params: {
                    category_id: category_id
                }
            });

            setProductsData(response.data);
            setProductsSelected(response.data[0])
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw new Error(`Não foi possivel listar os produtos "${error}"`);
        }
    }


    return (
        <ProductsContext.Provider value={{
            loading,
            productsData,
            productsSelected,
            setProductsSelected,
            loadProducts
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

function useProducts() {
    const context = useContext(ProductsContext);

    if (!context) {
        throw new Error('useProducts must be used within a AuthProvider');
    }

    return context;
}

export {
    ProductsProvider,
    useProducts
}