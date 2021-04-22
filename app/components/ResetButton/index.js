import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { resetUserSlice, resetBill } from "../../store/slices/billSlice";
import MyButton from "../MyButton";

export default function ResetButton(props) {
    const dispatch = useDispatch();
    const onResetHandler = () => {
        dispatch(resetBill());
    };
    return (
        <MyButton color="light" onPress={onResetHandler}>
            Reset
        </MyButton>
    );
}

const styles = StyleSheet.create({
    container: {},
});
