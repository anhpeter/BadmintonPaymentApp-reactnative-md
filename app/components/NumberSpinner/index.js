import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";

export default function NumberSpinner(props) {
    const { value, ...rest } = props;
    return (
        <InputSpinner
            height={40}
            //buttonStyle={styles.buttonStyle}
            skin="clean"
            colorMax={"#f04048"}
            value={value}
            {...rest}
        />
    );
}