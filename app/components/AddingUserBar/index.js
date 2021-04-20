import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { getBillCock, getBillTime } from "../../store/slices/billSlice";
import { addUser, selectUserUsernames } from "../../store/slices/billSlice";

export default function AddingUserBar(props) {
    const [inputVal, setInputVal] = useState("");
    const usernames = useSelector(selectUserUsernames);
    const totalCock = useSelector(getBillCock);
    const dispatch = useDispatch();
    const playingTime = useSelector(getBillTime);

    const onEndEditingHandler = () => {
        if (inputVal.trim() !== "") {
            if (usernames.indexOf(inputVal) === -1) {
                dispatch(
                    addUser({
                        username: inputVal,
                        cock: totalCock,
                        otherPrice: 0,
                        playingTime,
                    })
                );
                setInputVal("");
            } else alert("Username already exist");
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <TextInput
                    style={styles.input}
                    value={inputVal}
                    onEndEditing={onEndEditingHandler}
                    onChangeText={(text) => setInputVal(text)}
                    selectionColor={Colors.black}
                    placeholder="Enter username"
                />
            </KeyboardAvoidingView>
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
    input: { height: 50 },
});
