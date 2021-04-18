import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Colors from "../../constants/Colors";

export default function ListItem(props) {
    const { children, style, ...rest } = props;
    return (
        <TouchableWithoutFeedback {...rest}>
            <View style={{ ...styles.container, ...style }}>{children}</View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: Colors.default,
        marginVertical: 10,
    },
});
