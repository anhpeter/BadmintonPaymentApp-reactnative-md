import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../Card";
import OptionalSetting from "../OptionalSetting";
import PlayingTimeSetting from "../PlayingTimeSetting";

export default function OptionBoard(props) {
    return (
        <View style={styles.container}>
            <PlayingTimeSetting />
            <OptionalSetting />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    optionalBoard: {
        marginTop: 20,
    },
});
