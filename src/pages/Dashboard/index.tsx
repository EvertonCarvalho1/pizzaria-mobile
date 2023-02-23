import React from 'react';
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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
                placeholder='Número da mesa'
                placeholderTextColor={'#f0f0f0'}
                style={styles.input}
                keyboardType='numeric'
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}