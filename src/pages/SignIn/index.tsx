import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { styles } from './styles';

export default function SignIn() {

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
                />

                <TextInput
                    style={styles.input}
                    placeholder='Digite sua senha'
                    placeholderTextColor="#f0f0f0"
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
