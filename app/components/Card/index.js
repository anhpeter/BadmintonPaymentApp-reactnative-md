import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default function Card(props) {
    const { children, style } = props;
    return <View style={{ ...styles.container, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        // android
        elevation: 5,
        // ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: "#fff",
        marginVertical: 10,
    },
});
