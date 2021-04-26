import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultOption from "../../commons/DefaultOption";
import BodyText from "../../components/BodyText";
import Card from "../../components/Card";
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

    const smallScreenPriceItemContainerStyle =
        Dimensions.get("window").width < 350
            ? {
                  flexDirection: "column",
                  height: 70,
                  alignItems: "center",
              }
            : null;
    const priceItemContainerStyle = {
        ...styles.priceItemContainer,
        ...smallScreenPriceItemContainerStyle,
    };

    return (
        <Screen style={styles.container}>
            <Card style={styles.settingCard}>
                <View style={priceItemContainerStyle}>
                    <BodyText>Yard price / hour </BodyText>
                    <NumberSpinner
                        min={0}
                        step={DefaultOption.yardPriceStep}
                        onChange={(value) => {
                            dispatch(changePriceOfYardPerHour(value));
                        }}
                        value={priceOfYardPerHour}
                    />
                </View>

                <View style={priceItemContainerStyle}>
                    <BodyText>Cock price</BodyText>
                    <NumberSpinner
                        min={0}
                        step={DefaultOption.cockPriceStep}
                        onChange={(value) => {
                            dispatch(changePriceOfCock(value));
                        }}
                        value={priceOfCock}
                    />
                </View>
            </Card>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    settingCard: {
        alignItems: "center",
    },
    priceItemContainer: {
        width: 300,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
