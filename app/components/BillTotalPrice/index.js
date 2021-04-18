import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Helper from "../../commons/Helper";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";

export default function BillTotalPrice(props) {
    const { totalPrice } = props;

    return (
        <View style={styles.totalPriceContainer}>
            <BodyText style={styles.totalPriceLabel}>Total</BodyText>
            <BodyText style={styles.totalPrice}>
                {Helper.getPriceFormat(totalPrice, true)}
            </BodyText>
        </View>
    );
}

const styles = StyleSheet.create({
    totalPriceContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 20,
    },
    totalPriceLabel: {
        fontWeight: "bold",
        marginRight: 20,
    },
    totalPrice: {
        color: Colors.secondary,
    },
});
