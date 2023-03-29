import React, { useState, createContext, ReactNode, useContext, } from "react";

import { api } from '../services/api';
import { useAuth } from './auth';

export type CategoryData = {
    id: string;
    name: string
}


type CategoryContextData = {
    loading: boolean;
    loadInfo: () => Promise<void>;
    categoryData: CategoryData[]
}

type CategoryProviderProps = {
    children: ReactNode;
}

const CategoryContext = createContext({} as CategoryContextData);

function CategoryProvider({ children }: CategoryProviderProps) {
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState<CategoryData[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryData>({} as CategoryData);

    async function loadInfo() {
        setLoading(true);

        try {
            const response = await api.get('/category');
            setCategoryData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw new Error(`Não foi possivel listar as categorias "${error}"`);
        }
    }

    return (
        <CategoryContext.Provider value={{
            loading,
            loadInfo,
            categoryData
        }}>
            {children}
        </CategoryContext.Provider>
    );
}

function useCategory() {
    const context = useContext(CategoryContext);

    if (!context) {
        throw new Error('useCategory must be used within a AuthProvider');
    }

    return context;
}

export {
    CategoryProvider,
    useCategory
}