import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { useAuth } from "../../hooks/auth";

import { styles } from './styles';

export default function SignIn() {
    const { signIn, loadingAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (email === '' || password === '') {
            return;
        }
        try {
            await signIn({ email, password });
        } catch (error) {
            console.log('meu erro', error);
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />


            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.input}
                    placeholder='Digite seu email'
                    placeholderTextColor="#f0f0f0"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Digite sua senha'
                    placeholderTextColor="#f0f0f0"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color='#FFF' />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>)}
                </TouchableOpacity>
            </View>
        </View>
    )
}
