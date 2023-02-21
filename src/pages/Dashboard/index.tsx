import React from 'react';
import { View, Text, Button } from 'react-native'
import { useAuth } from '../../hooks/auth';

export default function Dashboard() {
    const { signOut } = useAuth();


    return (
        <View>
            <Text>Tela dashboard :</Text>
            <Button
                title='Sair'
                onPress={signOut}
            />
        </View>
    )
}