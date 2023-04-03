import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { CategoryData, useCategory } from '../../hooks/category';
import { ProductsData } from '../../hooks/products';

import { styles } from './styles';

type ModalPickerProps = {
    handleCloseModal: () => void;
    selectedItem: (item: CategoryData | ProductsData) => void;
}

export function ModalPicker({
    handleCloseModal,
    selectedItem
}: ModalPickerProps) {
    const { categoryData } = useCategory();

    function onPressItem(item: CategoryData | ProductsData) {
        selectedItem(item);
        handleCloseModal();
    }

    const option = categoryData.map((item, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.item}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleCloseModal}
        >
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}