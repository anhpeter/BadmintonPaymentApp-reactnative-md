import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Helper from "../../commons/Helper";
import Pricing from "../../commons/Pricing";
import { removeUserByUsername } from "../../store/slices/usersSlice";
import UserBill from "../UserBill";
import UserModal from "../UserModal";

export default function UserBillList(props) {
    const { users, playingTimes, totalCock } = props;
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const userCockPayments = Pricing.getUserCockPayments(totalCock, users);
    const userPlayingTimePayments = Pricing.getPlayingTimePayments(
        playingTimes
    );
    const cocks = users.map((item) => item.cock);
    const isCockDiff = Object.keys(Helper.count(cocks)).length > 1;
    const isPlayingTimeDiff = Object.keys(Helper.count(playingTimes)).length > 1;

    const onLongPressHandler = (item) => {
        dispatch(removeUserByUsername(item.username));
    };

    return (
        <View>
            {users.length > 0
                ? users.map((item) => (
                      <UserBill
                          onLongPress={onLongPressHandler.bind(this, item)}
                          onPress={() => {
                              setModalVisible(true);
                              setCurrentUser(item);
                          }}
                          key={item.username}
                          user={item}
                          userCockPayment={userCockPayments[item.username]}
                          userPlayingTimePayment={
                              userPlayingTimePayments[item.playingTime]
                          }
                          notShowCockQty={!isCockDiff}
                          showPlayingTime={isPlayingTimeDiff}
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
