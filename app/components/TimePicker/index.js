import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import MyTime from "../../commons/MyTime";
import TimeString from "../TimeString";

export default function TimePicker(props) {
    const { onChange, time, show, setShow } = props;
    return (
        <View>
            <View>
                <TimeString
                    onPress={() => {
                        setShow(true);
                    }}
                    time={time}
                />
            </View>
            {/* TIME PICKER */}
            {show ? (
                <RNDateTimePicker
                    is24Hour={true}
                    mode="time"
                    display={Platform.OS === "android" ? "clock" : "spinner"}
                    value={new Date(MyTime.convertToUtcTime(time))}
                    onChange={onChange}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
