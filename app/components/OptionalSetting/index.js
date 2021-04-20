import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
    setBillOtherPrice,
    getBillCock,
    getBillOtherPrice,
    setBillCock,
} from "../../store/slices/billSettingSlice";
import { decreaseCock, increaseCock } from "../../store/slices/usersSlice";
import BodyText from "../BodyText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../Card";
import NumberSpinner from "../NumberSpinner";
import ShuttleCockIcon from "../ShuttleCockIcon";
import OtherPriceSetting from "../OtherPriceSetting";

export default function OptionalSetting(props) {
    const dispatch = useDispatch();
    const totalCock = useSelector(getBillCock);
    const billOtherPrice = useSelector(getBillOtherPrice);
    return (
        <View style={styles.container}>
            {/* SHUTTLE COCK */}
            <View style={styles.product}>
                <ShuttleCockIcon />
                <View>
                    <NumberSpinner
                        editable={false}
                        min={0}
                        step={1}
                        value={totalCock}
                        onIncrease={(value) => {
                            dispatch(increaseCock());
                        }}
                        onDecrease={() => {
                            dispatch(decreaseCock());
                        }}
                        onChange={(value) => {
                            dispatch(setBillCock(value));
                        }}
                    />
                </View>
            </View>
            {/* OTHER PRICE */}
            <OtherPriceSetting
                style={styles.product}
                value={billOtherPrice}
                onChange={(value) => {
                    dispatch(setBillOtherPrice(value));
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    productsWrapper: {},
    product: {
        width: 225,
        maxWidth: "80%",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
