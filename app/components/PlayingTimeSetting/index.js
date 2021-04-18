import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../commons/Helper";
import MyTime from "../../commons/MyTime";
import Colors from "../../constants/Colors";
import { getBillTime, setBillTime } from "../../store/slices/billSettingSlice";
import BodyText from "../BodyText";
import Card from "../Card";
import SubTitleText from "../SubTitleText";
import TitleText from "../TitleText";

const getTimeString = (time) => {
    if (time) {
        const hour = Helper.strPad(
            (Math.floor(time / 60 / 60 / 1000) % 60) + "",
            2,
            "0",
            "l"
        );
        const minute = Helper.strPad(
            (Math.floor(time / 60 / 1000) % 60) + "",
            2,
            "0",
            "l"
        );
        return `${hour}:${minute}'`;
    }
};

export default function PlayingTimeSetting(props) {
    const dispatch = useDispatch();
    const time = useSelector(getBillTime);
    const [show, setShow] = useState(false);
    const onTimeChangeHandler = (event, selectedDate) => {
        const currentDate =
            MyTime.convertToLocalTime(new Date(selectedDate).getTime()) || time;
        setShow(false);
        dispatch(setBillTime(currentDate));
    };

    return (
        <View style={styles.container}>
            <BodyText style={{ fontWeight: "bold" }}>Playing time</BodyText>
            <View>
                <BodyText
                    style={styles.timeString}
                    onPress={() => {
                        setShow(true);
                    }}
                >
                    {getTimeString(time)}
                </BodyText>
            </View>
            {/* TIME PICKER */}
            {show ? (
                <RNDateTimePicker
                    is24Hour={true}
                    mode="time"
                    value={new Date(MyTime.convertToUtcTime(time))}
                    onChange={onTimeChangeHandler}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    timeString: {
        marginVertical: 10,
        color: Colors.primary,
        borderBottomWidth: 2,
        borderColor: Colors.primary,
    },
    timeCard: {
        minWidth: 100,
    },
});
