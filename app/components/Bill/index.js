import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Pricing from "../../commons/Pricing";
import {
    getBillCock,
    getBillTime,
    getBillOptionsPrice,
    getYardPrice,
    getCockPrice,
} from "../../store/slices/billSettingSlice";
import { getPlayingTimes, selectAllUser } from "../../store/slices/usersSlice";
import BillTotalPrice from "../BillTotalPrice";
import UserBillList from "../UserBillList";

export default function Bill(props) {
    const users = useSelector(selectAllUser);
    const playingTimes = useSelector(getPlayingTimes);
    const totalCock = useSelector(getBillCock);
    const yardPrice = useSelector(getYardPrice);
    const cockPrice = useSelector(getCockPrice);
    const totalOtherPrice = Pricing.getTotalOtherPrice(users);

    return (
        <View style={styles.container}>
            <UserBillList
                users={users}
                playingTimes={playingTimes}
                totalCock={totalCock}
            />
            <BillTotalPrice
                yardPrice={yardPrice}
                cockPrice={cockPrice}
                totalOtherPrice={totalOtherPrice}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
