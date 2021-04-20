import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { resetUserSlice, resetBill } from "../../store/slices/billSlice";

export default function ResetButton(props) {
    const dispatch = useDispatch();
    const onResetHandler = () => {
        dispatch(resetBill());
    };
    return (
        <Button onPress={onResetHandler} title="Reset" color={Colors.primary} />
    );
}

const styles = StyleSheet.create({
    container: {},
});
