import React, { useState, createContext, ReactNode, useContext, } from "react";

import { api } from '../services/api';
import { useAuth } from './auth';

type CategoryData = {
    id: string;
    name: string
}


type CategoryContextData = {

}

type CategoryProviderProps = {
    children: ReactNode;
}

const CategoryContext = createContext({} as CategoryContextData);

function CategoryProvider({ children }: CategoryProviderProps) {
    const [category, setCategory] = useState<CategoryData[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryData>({} as CategoryData);

    return (
        <CategoryContext.Provider value={{}}>
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