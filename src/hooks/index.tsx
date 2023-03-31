
import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { OrderProvider } from './order';
import { CategoryProvider } from './category';
import { ProductsProvider } from './products';

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return (
        <AuthProvider>
            <OrderProvider>
                <CategoryProvider>
                    <ProductsProvider>
                        {children}
                    </ProductsProvider>
                </CategoryProvider>
            </OrderProvider>
        </AuthProvider>
    )
}

export { AppProvider };