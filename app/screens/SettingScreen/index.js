import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BodyText from "../../components/BodyText";
import NumberSpinner from "../../components/NumberSpinner";
import Screen from "../../components/Screen";
import {
    changePriceOfCock,
    changePriceOfYardPerHour,
    getPriceOfCock,
    getPriceOfYardPerHour,
    setPriceOfCock,
    setPriceOfYardPerHour,
} from "../../store/slices/billSlice";

export default function SettingScreen(props) {
    const dispatch = useDispatch();
    const priceOfYardPerHour = useSelector(getPriceOfYardPerHour);
    const priceOfCock = useSelector(getPriceOfCock);
    return (
        <Screen style={styles.container}>
            <View style={styles.priceItemContainer}>
                <BodyText>Yard per hour price</BodyText>
                <NumberSpinner
                    min={0}
                    step={1000}
                    onChange={(value) => {
                        dispatch(changePriceOfYardPerHour(value));
                    }}
                    value={priceOfYardPerHour}
                />
            </View>

            <View style={styles.priceItemContainer}>
                <BodyText>Cock price</BodyText>
                <NumberSpinner
                    min={0}
                    step={1000}
                    onChange={(value) => {
                        dispatch(changePriceOfCock(value));
                    }}
                    value={priceOfCock}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center",
    },
    priceItemContainer: {
        width: 300,
        maxWidth: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
