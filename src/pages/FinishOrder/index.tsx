import React from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { useOrder } from '../../hooks/order';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';


export default function FinishOrder() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const { orderData, finishOrder } = useOrder();

    async function handleFinish() {
        try {
            await finishOrder(orderData?.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <View style={styles.container}>
            <Text style={styles.alert}>
                Você deseja finalizar esse pedido?
            </Text>
            <Text style={styles.title}>
                Mesa {orderData?.table}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleFinish}
            >
                <Text style={styles.textButton}>
                    Finalizar pedido
                </Text>
                <Feather name='shopping-cart' size={20} color="#1d1d2e" />
            </TouchableOpacity>

        </View>
    )
}