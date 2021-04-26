import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import NumberSpinner from "../NumberSpinner";
import ShuttleCockIcon from "../ShuttleCockIcon";

export default function ShuttleCockSetting(props) {
    const { value, onChange, style } = props;
    return (
        <View style={{ ...styles.container, ...style }}>
            <ShuttleCockIcon />
            <View>
                <NumberSpinner
                    min={0}
                    step={1}
                    onChange={onChange}
                    value={value}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
