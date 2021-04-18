import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";
import ListItem from "../ListItem";
import IconWithLabel from "../IconWithLabel";
import Helper from "../../commons/Helper";
import ShuttleCockIcon from "../ShuttleCockIcon";
import OtherIcon from "../OtherIcon";
import FontFamily from "../../constants/FontFamily";
import PlayIcon from "../PlayIcon";

export default function UserBill(props) {
    const {
        user,
        userPlayingTimePayment = 0,
        userCockPayment = 0,
    } = props;
    const { username, otherPrice = 0 } = user;

    const totalUserPrice = userCockPayment + userPlayingTimePayment + otherPrice;
    const billItems = [
        {
            icon: <ShuttleCockIcon />,
            price: userCockPayment,
        },
        {
            icon: <PlayIcon />,
            price: userPlayingTimePayment,
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
