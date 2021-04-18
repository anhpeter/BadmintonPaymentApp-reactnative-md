import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Component(props) {
    return (
        <View style={styles.container}>
            <Text>Component works</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    }
});