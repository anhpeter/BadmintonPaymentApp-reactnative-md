import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { getBillCock } from "../../store/slices/billSettingSlice";
import { addUser, selectUserUsernames } from "../../store/slices/usersSlice";

export default function AddingUserBar(props) {
    const [inputVal, setInputVal] = useState("");
    const usernames = useSelector(selectUserUsernames);
    const totalCock = useSelector(getBillCock);
    const dispatch = useDispatch();

    const onEndEditingHandler = () => {
        if (inputVal.trim() !== "") {
            if (usernames.indexOf(inputVal) === -1) {
                dispatch(addUser({ username: inputVal, cock: totalCock, otherPrice: 0 }));
                setInputVal("");
            } else alert("Username already exist");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={inputVal}
                onEndEditing={onEndEditingHandler}
                onChangeText={(text) => setInputVal(text)}
                selectionColor={Colors.black}
                placeholder="Enter username"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: Colors.default,
    },
});