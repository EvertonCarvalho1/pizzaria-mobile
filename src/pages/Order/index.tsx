import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

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
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>

                <TouchableOpacity>
                    <Feather name='trash-2' size={28} color='#ff3f4b' />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#fff' }}>Pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#fff' }}>Pizzas de calabressa</Text>
            </TouchableOpacity>
        </View>
    );
}