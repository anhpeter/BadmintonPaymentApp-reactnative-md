import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../commons/Helper";
import MyTime from "../../commons/MyTime";
import Colors from "../../constants/Colors";
import { getBillTime, setBillTime } from "../../store/slices/billSlice";
import { updatePlayingTime } from "../../store/slices/billSlice";
import BodyText from "../BodyText";
import Card from "../Card";
import SubTitleText from "../SubTitleText";
import TimePicker from "../TimePicker";
import TitleText from "../TitleText";

export default function PlayingTimeSetting(props) {
    const dispatch = useDispatch();
    const time = useSelector(getBillTime);

    const [show, setShow] = useState(false);
    const onTimeChangeHandler = (event, selectedDate) => {
        const currentTime =
            MyTime.convertToLocalTime(new Date(selectedDate).getTime()) || time;
        //setShow(false);
        setShow(Platform.OS === "ios");
        dispatch(setBillTime(currentTime));
        dispatch(updatePlayingTime(currentTime));
    };

    return (
        <View style={styles.container}>
            <BodyText style={{ fontWeight: "bold" }}>Playing time</BodyText>
            <TimePicker
                onChange={onTimeChangeHandler}
                time={time}
                show={show}
                setShow={setShow}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
});
