import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

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
            <Text>Item da lista</Text>
        </View>
    )
}