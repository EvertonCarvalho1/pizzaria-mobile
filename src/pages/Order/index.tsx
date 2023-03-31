import React, {
    useState,
    useEffect
} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useOrder } from '../../hooks/order';
import { CategoryData, useCategory } from '../../hooks/category';

import { Feather } from '@expo/vector-icons';

import { ModalPicker } from '../../components/ModalPicker';

import { styles } from './styles';

export default function Order() {
    const navigation = useNavigation();

    const [amount, setAmount] = useState('1');
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);



    const {
        orderData,
        closeOrder
    } = useOrder();

    const {
        loadInfo,
        categorySelected,
        categoryData,
        setCategorySelected
    } = useCategory();

    useEffect(() => {
        loadInfo();
    }, []);

    async function handleCloseOrder() {
        try {
            await closeOrder(orderData?.id);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    function handleChangeCategory(item: CategoryData) {
        setCategorySelected(item);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa</Text>

                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={28} color='#ff3f4b' />
                </TouchableOpacity>
            </View>

            {categoryData.length !== 0 && (
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setModalCategoryVisible(true)}
                >
                    <Text style={{ color: '#fff' }}>{categorySelected?.name}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#fff' }}>Pizzas de calabressinha</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor='#f0f0f0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

        </View>
    );
}