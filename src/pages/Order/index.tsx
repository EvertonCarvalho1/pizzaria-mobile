import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
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

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor='#f0f0f0'
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}