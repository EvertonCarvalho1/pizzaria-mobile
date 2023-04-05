import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';

export type StackParamsList = {
    Dashboard: undefined;
    Order: undefined;
    FinishOrder: undefined
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order'
                component={Order}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='FinishOrder'
                component={FinishOrder}
            //options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;