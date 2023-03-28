
import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { OrderProvider } from './order';
import { CategoryProvider } from './category';

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return (
        <AuthProvider>
            <OrderProvider>
                <CategoryProvider>
                    {children}
                </CategoryProvider>
            </OrderProvider>
        </AuthProvider>
    )
}

export { AppProvider };