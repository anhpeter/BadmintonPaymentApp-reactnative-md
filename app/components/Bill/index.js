import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Pricing from "../../commons/Pricing";
import {
    getBillOptionsPrice,
    getYardPrice,
    getCockPrice,
    getBillOtherPrice,
} from "../../store/slices/billSlice";
import { getPlayingTimes, selectAllUser } from "../../store/slices/billSlice";
import BillTotalPrice from "../BillTotalPrice";
import UserBillList from "../UserBillList";

export default function Bill(props) {
    const users = useSelector(selectAllUser);
    const yardPrice = useSelector(getYardPrice);
    const cockPrice = useSelector(getCockPrice);
    const billOtherPrice = useSelector(getBillOtherPrice);
    const totalOtherPrice = Pricing.getTotalOtherPrice(users) + billOtherPrice;

    return (
        <View style={styles.container}>
            <UserBillList />
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
