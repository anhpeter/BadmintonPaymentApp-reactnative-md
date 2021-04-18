import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FontFamily from "../../constants/FontFamily";

export default function BodyText(props) {
    const { children, ...rest } = props;
    return (
        <Text {...rest} style={{ ...styles.text, ...rest.style }}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: FontFamily.montserratMedium,
    },
});
