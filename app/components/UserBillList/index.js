import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../commons/Helper";
import Pricing from "../../commons/Pricing";
import {
    getBillCock,
    getBillOtherPrice,
    getPriceOfCock,
    getPriceOfYardPerHour,
    getUserCockPayments,
    getUserPlayingTimePayments,
    isCockDiff,
    isPlayingTimeDiff,
} from "../../store/slices/billSlice";
import {
    getPlayingTimes,
    removeUserByUsername,
    selectAllUser,
} from "../../store/slices/billSlice";
import UserBill from "../UserBill";
import UserModal from "../UserModal";

export default function UserBillList(props) {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUser);
    const cockDiff = useSelector(isCockDiff);
    const playingTimeDiff = useSelector(isPlayingTimeDiff);

    // state
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    //

    const userPlayingTimePayments = useSelector(getUserPlayingTimePayments);
    const userCockPayments = useSelector(getUserCockPayments);
    const onLongPressHandler = (item) => {
        dispatch(removeUserByUsername(item.username));
    };

    return (
        <View>
            {users.length > 0
                ? users.map((item, index) => (
                      <UserBill
                          key={item.username}
                          no={index + 1}
                          user={item}
                          showCock={cockDiff}
                          showPlayingTime={playingTimeDiff}
                          userCockPayment={userCockPayments[item.username]}
                          userPlayingTimePayment={
                              userPlayingTimePayments[item.playingTime]
                          }
                          onLongPress={onLongPressHandler.bind(this, item)}
                          onPress={() => {
                              setModalVisible(true);
                              setCurrentUser(item);
                          }}
                      />
                  ))
                : null}
            {currentUser ? (
                <UserModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={currentUser}
                    users={users}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
