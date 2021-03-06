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
import TimeString from "../TimeString";
import { useSelector } from "react-redux";
import {
    getAvgBillOtherPriceForEachUser,
    getBillCock,
    getBillTime,
} from "../../store/slices/billSlice";

export default function UserBill(props) {
    const {
        no,
        user,
        showCock,
        showPlayingTime,
        userPlayingTimePayment = 0,
        userCockPayment = 0,
        ...rest
    } = props;
    let { cock, playingTime, username, otherPrice = 0 } = user;
    const totalPlayingTime = useSelector(getBillTime);
    const totalCock = useSelector(getBillCock);
    const avgBillOtherPrice = useSelector(getAvgBillOtherPriceForEachUser);
    otherPrice += avgBillOtherPrice || 0;

    const totalUserPrice =
        userCockPayment + userPlayingTimePayment + otherPrice;
    const cockQty = showCock ? ` (${cock})` : "";
    const cockColor = cock === totalCock ? "black" : "info";
    const playingTimeColor =
        playingTime === totalPlayingTime ? "black" : "info";
    const billItems = [
        {
            icon: <ShuttleCockIcon />,
            label:
                userCockPayment > 0 ? (
                    <Text>
                        <Text>
                            {Helper.getPriceFormat(userCockPayment || 0)}
                        </Text>
                        <Text style={{ color: Colors[cockColor] }}>
                            {cockQty}
                        </Text>
                    </Text>
                ) : null,
        },
        {
            icon: <PlayIcon />,
            label: Helper.getPriceFormat(userPlayingTimePayment || 0),
            secondaryLabel: showPlayingTime ? (
                <TimeString time={playingTime} color={playingTimeColor} />
            ) : null,
        },
        {
            icon: <OtherIcon />,
            label:
                otherPrice > 0 ? Helper.getPriceFormat(otherPrice || 0) : null,
        },
    ];
    return (
        <ListItem style={styles.container} {...rest}>
            <View>
                <BodyText style={styles.username}>{username}</BodyText>
            </View>

            {/* DETAIL */}
            <View style={styles.detailContainer}>
                {billItems.map((item, index) => {
                    if (item.label)
                        return (
                            <IconWithLabel
                                style={styles.detailItem}
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                secondaryLabel={item.secondaryLabel}
                            />
                        );
                    return <View key={index} style={styles.detailItem}></View>;
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
        marginHorizontal: 10,
    },
    userTotalPrice: {
        color: Colors.primary,
    },
    detailContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    detailItem: { flex: 1, justifyContent: "flex-end" },
});
