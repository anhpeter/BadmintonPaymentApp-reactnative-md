import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Helper from "../../commons/Helper";
import Colors from "../../constants/Colors";
import Price from "../../constants/Price";
import {
    getBillCock,
    getBillTime,
    getTotalPrice,
} from "../../store/slices/billSettingSlice";
import { selectAllUser } from "../../store/slices/usersSlice";
import BodyText from "../BodyText";
import UserBill from "../UserBill";

function getPlayingCockStatistic(totalCock, users) {
    const playingCockStatistic = {};
    for (let i = 1; i <= totalCock; i++) {
        playingCockStatistic[i] = users.filter((user) => {
            return user.cock >= i;
        }).length;
    }
    return playingCockStatistic;
}

function getUserCockPayments(playingCockStatistic, users) {
    const cockPayment = {};
    users.forEach((user) => {
        for (let i = Object.keys(playingCockStatistic).length; i >= 1; i--) {
            if (user.cock >= i) {
                cockPayment[user.username] = cockPayment[user.username] || 0;
                cockPayment[user.username] += Math.round(
                    Price.cockPrice / playingCockStatistic[i]
                );
            }
        }
    });
    return cockPayment;
}

function UserBillList(props) {
    const { users, playingTime, totalCock } = props;
    const playingCockStatistic = getPlayingCockStatistic(totalCock, users);
    const userCockPayments = getUserCockPayments(playingCockStatistic, users);
    const yardPrice = Helper.getYardPrice(playingTime);
    const userYardPrice = Math.round(yardPrice / users.length);

    return (
        <View>
            {users.length > 0
                ? users.map((user) => (
                      <UserBill
                          key={user.username}
                          user={user}
                          userCockPayment={userCockPayments[user.username]}
                          userYardPrice={userYardPrice}
                      />
                  ))
                : null}
        </View>
    );
}

export default function Bill(props) {
    const users = useSelector(selectAllUser);
    const playingTime = useSelector(getBillTime);
    const totalCock = useSelector(getBillCock);
    const billPrice = useSelector(getTotalPrice);
    const totalOtherPrice =
        users.length > 0
            ? users.reduce((previous, current) => {
                  return previous + current.otherPrice;
              }, 0)
            : 0;
    const totalPrice = billPrice + totalOtherPrice;

    return (
        <View style={styles.container}>
            {/* USER BILL LIST */}
            <UserBillList
                users={users}
                playingTime={playingTime}
                totalCock={totalCock}
            />

            {/* TOTAL PRICE */}
            <View style={styles.totalPriceContainer}>
                <BodyText style={styles.totalPriceLabel}>Total</BodyText>
                <BodyText style={styles.totalPrice}>{Helper.getPriceFormat(totalPrice, true)}</BodyText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    totalPriceContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 20,
    },
    totalPriceLabel: {
        fontWeight: "bold",
        marginRight: 20,
    },
    totalPrice:{
        color: Colors.secondary
    }
});
