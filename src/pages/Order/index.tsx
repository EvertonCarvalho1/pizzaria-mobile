import React, {
    useState,
    useEffect
} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useOrder } from '../../hooks/order';
import { CategoryData, useCategory } from '../../hooks/category';
import { useProducts, ProductsData } from '../../hooks/products';

import { Feather } from '@expo/vector-icons';

import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';

import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

export default function Order() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const {
        orderData,
        closeOrder,
        addItemOrder,
        items,
        setItems
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

    const [amount, setAmount] = useState('1');

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [modalProductsVisible, setModalProductsVisible] = useState(false);

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

    async function handleAdd() {
        try {
            addItemOrder({
                order_id: orderData?.id,
                product_id: productsSelected?.id,
                amount: Number(amount),
                name: productsSelected?.name
            });
        } catch (error) {
            console.log(error);
        }
    }

    function handleFinishOrder() {
        navigation.navigate('FinishOrder');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa</Text>

                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name='trash-2' size={28} color='#ff3f4b' />
                    </TouchableOpacity>
                )}
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
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={handleAdd}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.button, { opacity: items.length === 0 ? 0.4 : 1 }]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} />}
            />

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