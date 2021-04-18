import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { resetBillSettingSlice } from "../../store/slices/billSettingSlice";
import { resetUserSlice } from "../../store/slices/usersSlice";

export default function ResetButton(props) {
    const dispatch = useDispatch();
    const onResetHandler = () => {
        dispatch(resetBillSettingSlice());
        dispatch(resetUserSlice());
    };
    return (
        <Button onPress={onResetHandler} title="Reset" color={Colors.primary} />
    );
}

const styles = StyleSheet.create({
    container: {},
});
