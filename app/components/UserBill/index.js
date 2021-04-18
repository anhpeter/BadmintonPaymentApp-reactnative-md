import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";
import ListItem from "../ListItem";
import IconWithLabel from "../IconWithLabel";
import Helper from "../../commons/Helper";
import ShuttleCockIcon from "../ShuttleCockIcon";
import OtherIcon from "../OtherIcon";
import BadmintonRacketIcon from "../BadmintonRacketIcon";
import FontFamily from "../../constants/FontFamily";

export default function UserBill(props) {
    const { user, userCockPayment = 0, userYardPrice = 0 } = props;
    const { username, otherPrice = 0 } = user;

    const totalUserPrice = userCockPayment + userYardPrice + otherPrice;
    const billItems = [
        {
            icon: <ShuttleCockIcon />,
            price: userCockPayment,
        },
        {
            icon: <BadmintonRacketIcon />,
            price: userYardPrice,
        },
        {
            icon: <OtherIcon />,
            price: user.otherPrice,
        },
    ];
    return (
        <ListItem style={styles.container}>
            <View>
                <BodyText style={styles.username}>{username}</BodyText>
            </View>

            {/* DETAIL */}
            <View style={styles.detailContainer}>
                {billItems.map((item, index) => {
                    return (
                        <IconWithLabel
                            style={{ flex: 1, justifyContent: "flex-end" }}
                            key={index}
                            icon={item.icon}
                            label={Helper.getPriceFormat(item.price || 0)}
                        />
                    );
                })}
            </View>
            <View style={styles.userTotalPriceContainer}>
                <BodyText style={styles.userTotalPrice}>
                    {Helper.getPriceFormat(totalUserPrice, true)}
                </BodyText>
            </View>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    container: {},
    username: {},
    userTotalPriceContainer: {
        fontFamily: FontFamily.montserratSemiBold,
        alignItems: "flex-end",
    },
    userTotalPrice: {
        color: Colors.primary,
    },
    detailContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
});
