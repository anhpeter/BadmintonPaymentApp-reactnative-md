import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import FontFamily from '../../constants/FontFamily';
import TitleText from '../TitleText';

export default function SubTitleText(props) {
    return (
        <TitleText style={styles.text}>{props.children}</TitleText>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    }
});

