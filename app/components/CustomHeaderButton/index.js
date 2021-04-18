import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function CustomHeaderButton(props) {

    return (
        <HeaderButton IconComponent={Ionicons}
            iconSize={23}
            color={Colors.white}
            {...props} />
    );
}
