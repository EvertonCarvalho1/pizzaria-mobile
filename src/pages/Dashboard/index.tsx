import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { useAuth } from '../../hooks/auth';
import { styles } from './styles';

export default function Dashboard() {
    const { signOut } = useAuth();
    const [number, setNumber] = useState('');

    async function openOrder() {
        alert('teste1');
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
                onPress={openOrder}
            >
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}