
import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { OrderProvider } from './order';

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    return (
        <AuthProvider>
            <OrderProvider>
                {children}
            </OrderProvider>
        </AuthProvider>
    )
}

export { AppProvider };