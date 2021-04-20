import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyTime from "../../commons/MyTime";
import Colors from "../../constants/Colors";
import {
    getBillCock,
    getBillTime,
    setBillCock,
    setBillTime,
} from "../../store/slices/billSettingSlice";
import {
    updateCockByUsername,
    getMaxCock,
    getMaxPlayingTime,
    updateOtherPriceByUsername,
    updatePlayingTimeByUsername,
} from "../../store/slices/usersSlice";
import MyModal from "../MyModal";
import NumberSpinner from "../NumberSpinner";
import OtherPriceSetting from "../OtherPriceSetting";
import ShuttleCockIcon from "../ShuttleCockIcon";
import ShuttleCockSetting from "../ShuttleCockSetting";
import SubTitleText from "../SubTitleText";
import TimePicker from "../TimePicker";

export default function UserModal(props) {
    const dispatch = useDispatch();
    const { users, user, modalVisible, setModalVisible } = props;
    const {
        username,
        cock: userCock,
        otherPrice: userOtherPrice,
        playingTime: userPlayingTime,
    } = user;
    // state
    const [loading, setLoading] = useState(true);
    const [playingTime, setPlayingTime] = useState(null);
    const [cock, setCock] = useState(null);
    const [otherPrice, setOtherPrice] = useState(null);
    const [show, setShow] = useState(false);
    //
    const maxCock = useSelector(getMaxCock);
    const maxPlayingTime = useSelector(getMaxPlayingTime);
    const totalCock = useSelector(getBillCock);
    const totalPlayingTime = useSelector(getBillTime);

    // update changes
    useEffect(() => {
        if (user) {
            if (users.length > 0 && maxCock !== totalCock)
                dispatch(setBillCock(maxCock));
            if (maxPlayingTime > 0 && maxPlayingTime !== totalPlayingTime)
                dispatch(setBillTime(maxPlayingTime));
        }
    }, [maxPlayingTime, totalPlayingTime, totalCock, maxCock, dispatch]);

    // set initial state
    useEffect(() => {
        setCock(userCock);
        setOtherPrice(userOtherPrice);
        setPlayingTime(userPlayingTime);
        setLoading(false);
        return () => {
            setCock(null);
            setOtherPrice(null);
            setPlayingTime(null);
            setLoading(true);
        };
    }, [
        username,
        modalVisible,
        userPlayingTime,
        userCock,
        userOtherPrice,
        setCock,
        setOtherPrice,
    ]);
    if (loading) return <View></View>;

    // confirm handler
    const onConfirmHandler = () => {
        if (cock !== userCock)
            dispatch(
                updateCockByUsername({
                    username,
                    cock,
                })
            );
        if (otherPrice !== userOtherPrice)
            dispatch(
                updateOtherPriceByUsername({
                    username,
                    otherPrice,
                })
            );
        if (playingTime !== userPlayingTime)
            dispatch(updatePlayingTimeByUsername({ username, playingTime }));
    };

    const onTimeChangeHandler = (event, selectedDate) => {
        const currentTime =
            MyTime.convertToLocalTime(new Date(selectedDate).getTime()) ||
            playingTime;
        setShow(false);
        setPlayingTime(currentTime);
    };
    return (
        <MyModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            style={styles.modal}
            onConfirm={onConfirmHandler}
        >
            <SubTitleText style={styles.username}>{username}</SubTitleText>
            <View style={styles.mainContent}>
                <ShuttleCockSetting
                    value={cock}
                    onChange={(value) => {
                        setCock(value);
                    }}
                    style={styles.item}
                />
                <OtherPriceSetting
                    value={otherPrice}
                    onChange={(value) => {
                        setOtherPrice(value);
                    }}
                    style={styles.item}
                />

                <View style={styles.item}>
                    <Text>Playing time</Text>
                    <View>
                        <TimePicker
                            onChange={onTimeChangeHandler}
                            time={playingTime}
                            show={show}
                            setShow={setShow}
                        />
                    </View>
                </View>
            </View>
        </MyModal>
    );
}

const styles = StyleSheet.create({
    container: {},
    modal: {
        maxWidth: "80%",
        width: 400,
    },
    username: {
        borderBottomColor: Colors.default,
        borderBottomWidth: 2,
    },
    mainContent: {
        paddingVertical: 25,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
    },
});
