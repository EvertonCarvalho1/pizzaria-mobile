import React from 'react';

import {
    View,
    Text,
} from 'react-native';
import { CategoryData } from '../../hooks/category';


import { styles } from './styles';

type ModalPickerProps = {
    options: CategoryData[];
    handleCloseModal: () => void;
    selectedItem: () => void;
}
export function ModalPicker({
    options,
    handleCloseModal,
    selectedItem
}: ModalPickerProps) {

    return (
        <View>
            <Text>
                ModalPicker
            </Text>
        </View>
    )
}