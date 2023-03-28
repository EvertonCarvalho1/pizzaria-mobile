import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { useOrder } from '../../hooks/order'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes';

import { styles } from './styles';

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const { openOrder } = useOrder();
    const [number, setNumber] = useState('');

    async function handleOpenOrder() {
        if (number === '') {
            return;
        }

        try {
            await openOrder(number);
            navigation.navigate('Order');
            setNumber('');
        } catch (error) {
            console.log('meu erro', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
                placeholder='Número da mesa'
                placeholderTextColor={'#f0f0f0'}
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleOpenOrder}
            >
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}