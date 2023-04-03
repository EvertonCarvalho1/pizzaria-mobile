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
import { useProducts, ProductsData } from '../../hooks/products';

import { Feather } from '@expo/vector-icons';

import { ModalPicker } from '../../components/ModalPicker';

import { styles } from './styles';

export default function Order() {
    const navigation = useNavigation();

    const [amount, setAmount] = useState('1');

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [modalProductsVisible, setModalProductsVisible] = useState(false);

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

    const {
        loadProducts,
        productsData,
        productsSelected,
        setProductsSelected
    } = useProducts();

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        if (categorySelected.id) {
            loadProducts(categorySelected.id);
        }
    }, [categorySelected]);

    async function handleCloseOrder() {
        try {
            await closeOrder(orderData?.id);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    function handleChangeCategory(item: CategoryData | ProductsData) {
        setCategorySelected(item);
    }

    function handleChangeProducts(item: CategoryData | ProductsData) {
        setProductsSelected(item as ProductsData);
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


            {productsData.length !== 0 && (
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setModalProductsVisible(true)}
                >
                    <Text style={{ color: '#fff' }}>{productsSelected?.name}</Text>
                </TouchableOpacity>
            )}

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
                    options={categoryData}
                />

            </Modal>

            <Modal
                transparent={true}
                visible={modalProductsVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductsVisible(false)}
                    selectedItem={handleChangeProducts}
                    options={productsData}
                />
            </Modal>

        </View>
    );
}