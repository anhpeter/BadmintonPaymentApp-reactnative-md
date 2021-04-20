import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BillTotalPrice from "../BillTotalPrice";
import UserBillList from "../UserBillList";

export default function Bill(props) {
    return (
        <View style={styles.container}>
            <UserBillList />
            <BillTotalPrice />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
