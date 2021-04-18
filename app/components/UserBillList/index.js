import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Pricing from "../../commons/Pricing";
import UserBill from "../UserBill";

export default function UserBillList(props) {
    const { users, playingTimes, totalCock } = props;
    const userCockPayments = Pricing.getUserCockPayments(totalCock, users);
    const userPlayingTimePayments = Pricing.getPlayingTimePayments(
        playingTimes
    );

    return (
        <View>
            {users.length > 0
                ? users.map((user) => (
                      <UserBill
                          key={user.username}
                          user={user}
                          userCockPayment={userCockPayments[user.username]}
                          userPlayingTimePayment={
                              userPlayingTimePayments[user.playingTime]
                          }
                      />
                  ))
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
