import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

import { useRoute, RouteProp } from '@react-navigation/native';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProp = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteProp>();

    return (
        <View style={styles.container}>
            <Text>Tela order</Text>
            <Text>{route.params.order_id}</Text>
        </View>
    );
}