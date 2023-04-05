import React from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { useOrder } from '../../hooks/order';

import { Feather } from '@expo/vector-icons';

type ItemProps = {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    }
}

import { styles } from './styles';

export function ListItem({ data }: ItemProps) {
    const { deleteItem } = useOrder();

    return (

        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>

            <TouchableOpacity
                onPress={() => deleteItem(data.id)}
            >
                <Feather name='trash-2' color="#ff3f4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}