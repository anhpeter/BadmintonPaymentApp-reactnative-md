import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Helper from "../../commons/Helper";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";

const getTimeString = (time) => {
    if (time) {
        const hour = Helper.strPad(
            (Math.floor(time / 60 / 60 / 1000) % 60) + "",
            2,
            "0",
            "l"
        );
        const minute = Helper.strPad(
            (Math.floor(time / 60 / 1000) % 60) + "",
            2,
            "0",
            "l"
        );
        return `${hour}:${minute}'`;
    }
};

export default function TimeString(props) {
    const { color = "primary", time, style, ...rest } = props;
    const colorStyle = {
        color: Colors[color],
        borderBottomColor: Colors[color],
    };
    return (
        <BodyText
            style={{ ...styles.timeString, ...colorStyle, ...style }}
            {...rest}
        >
            {getTimeString(time)}
        </BodyText>
    );
}

const styles = StyleSheet.create({
    timeString: {
        marginVertical: 10,
        borderBottomWidth: 2,
    },
});
