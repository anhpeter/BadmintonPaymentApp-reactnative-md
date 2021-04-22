import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";

export default function MyButton(props) {
    const {
        children,
        containerStyle,
        textStyle,
        color = "primary",
        ...rest
    } = props;
    let backgroundColor = Colors[color];
    let textColor = color !== "light" ? "white" : "black";

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.container, { backgroundColor }, containerStyle]}
                {...rest}
            >
                <View>
                    <BodyText style={{ color: textColor, ...textStyle }}>
                        {children}
                    </BodyText>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});
