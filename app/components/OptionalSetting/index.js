import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getBillCock, setBillCock } from "../../store/slices/billSettingSlice";
import { decreaseCock, increaseCock } from "../../store/slices/usersSlice";
import BodyText from "../BodyText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../Card";
import NumberSpinner from "../NumberSpinner";
import ShuttleCockIcon from "../ShuttleCockIcon";

export default function OptionalSetting(props) {
    const dispatch = useDispatch();
    const totalCock = useSelector(getBillCock);
    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical:10,
    },
    productsWrapper: {},
    product: {
        width: 175,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
