import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../commons/Helper";
import Colors from "../../constants/Colors";
import { getBillCock, setBillCock } from "../../store/slices/billSlice";
import {
    removeUserByUsername,
    selectAllUser,
} from "../../store/slices/billSlice";
import BodyText from "../BodyText";
import Card from "../Card";
import MyModal from "../MyModal";
import User from "../User";
import UserModal from "../UserModal";

export default function UserList(props) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const users = useSelector(selectAllUser);
    const playingTimes = users.map((user) => user.playingTime);
    const playingTimesStatistic = Helper.count(playingTimes);
    const notShowTimeIcon = Object.keys(playingTimesStatistic).length === 1;
    const onLongPressHandler = (item) => {
        dispatch(removeUserByUsername(item.username));
    };

    return (
        <View style={styles.container}>
            {users.length > 0 ? (
                users.map((item) => (
                    <User
                        onLongPress={onLongPressHandler.bind(this, item)}
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentUser(item);
                        }}
                        key={item.username}
                        user={item}
                        notShowCock={false}
                        notShowTime={notShowTimeIcon}
                    />
                ))
            ) : (
                <Text style={styles.notification}>No users</Text>
            )}
            {currentUser ? (
                <UserModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={currentUser}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    notification: {
        textAlign: "center",
        color: Colors.black,
        margin: 20,
    },
});
