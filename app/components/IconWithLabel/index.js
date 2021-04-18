import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Helper from "../../commons/Helper";
import BodyText from "../BodyText";

export default function IconWithLabel(props) {
    const { icon, label, labelPos = "r", style } = props;
    return (
        <View style={{...styles.container, ...style}}>
            {labelPos === "r" ? icon : null}
            <BodyText style={styles.label}>{label}</BodyText>
            {labelPos === "l" ? icon : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginHorizontal: 10,
    },
});
