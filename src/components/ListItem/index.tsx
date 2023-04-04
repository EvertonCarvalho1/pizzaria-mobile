import React from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

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

    return (

        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>

            <TouchableOpacity>
                <Feather name='trash-2' color="#ff3f4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}