import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import DefaultOption from "../../commons/DefaultOption";
import NumberSpinner from "../NumberSpinner";

export default function OtherPriceSetting(props) {
    const { value, onChange, style } = props;
    return (
        <View style={{ ...styles.container, ...style }}>
            <Text>Other price</Text>
            <View>
                <NumberSpinner
                    min={0}
                    step={DefaultOption.otherPriceStep}
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
