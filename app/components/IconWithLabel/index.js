import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Helper from "../../commons/Helper";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";

export default function IconWithLabel(props) {
    const {
        color = "black",
        icon,
        label,
        secondaryLabel = "",
        labelPos = "r",
        style,
    } = props;
    const textColor = Colors[color];
    return (
        <View style={{ ...styles.container, ...style }}>
            {labelPos === "r" ? icon : null}
            <View style={styles.labelContainer}>
                <BodyText style={{ ...styles.label, color: textColor }}>
                    {label}
                </BodyText>
                {secondaryLabel ? (
                    <BodyText
                        style={{ ...styles.secondaryLabel, color: textColor }}
                    >
                        {secondaryLabel}
                    </BodyText>
                ) : null}
            </View>
            {labelPos === "l" ? icon : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    labelContainer: {
        marginHorizontal: 10,
        alignItems: "flex-end",
    },
});
