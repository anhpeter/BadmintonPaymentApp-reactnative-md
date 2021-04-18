import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Pricing from "../../commons/Pricing";
import {
    getBillCock,
    getBillTime,
    getBillOptionsPrice,
} from "../../store/slices/billSettingSlice";
import { getPlayingTimes, selectAllUser } from "../../store/slices/usersSlice";
import BillTotalPrice from "../BillTotalPrice";
import UserBillList from "../UserBillList";

export default function Bill(props) {
    const users = useSelector(selectAllUser);
    const playingTimes = useSelector(getPlayingTimes);
    const totalCock = useSelector(getBillCock);
    const billPrice = useSelector(getBillOptionsPrice);
    const totalOtherPrice = Pricing.getTotalOtherPrice(users);
    const totalPrice = billPrice + totalOtherPrice;

    return (
        <View style={styles.container}>
            <UserBillList
                users={users}
                playingTimes={playingTimes}
                totalCock={totalCock}
            />
            <BillTotalPrice totalPrice={totalPrice} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
