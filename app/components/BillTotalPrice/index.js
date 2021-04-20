import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Helper from "../../commons/Helper";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";
import IconWithLabel from "../IconWithLabel";
import PlayIcon from "../PlayIcon";
import ShuttleCockIcon from "../ShuttleCockIcon";

export default function BillTotalPrice(props) {
    const { yardPrice, cockPrice, totalOtherPrice } = props;
    const total = yardPrice + cockPrice + totalOtherPrice;

    const prices = [
        {
            icon: <ShuttleCockIcon />,
            price: cockPrice,
        },
        {
            icon: <PlayIcon />,
            price: yardPrice,
        },
        {
            price: total,
            color: "secondary",
            priceSymbol: true,
        },
    ];

    return (
        <View style={styles.container}>
            <View>
                <BodyText style={styles.totalPriceLabel}>Total</BodyText>
            </View>
            <View style={styles.pricesContainer}>
                {prices.map((item, index) => {
                    const color = item.color || "black";
                    const price = Helper.getPriceFormat(
                        item.price,
                        item.priceSymbol || false
                    );
                    if (item.price > 0)
                        return (
                            <IconWithLabel
                                key={index}
                                icon={item.icon}
                                style={styles.price}
                                label={price}
                                color={color}
                            />
                        );
                    else return <View key={index} style={styles.price}></View>;
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    totalPriceLabel: {
        fontWeight: "bold",
        marginRight: 20,
        color: Colors.secondary,
    },
    pricesContainer: {
        marginTop: 10,
        flexDirection: "row",
    },
    price: {
        flex: 1,
        justifyContent: "flex-end",
    },
});
