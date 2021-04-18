import React, { useState } from "react";
import {
    Alert,
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from "react-native";
import Colors from "../../constants/Colors";
import BodyText from "../BodyText";
import Card from "../Card";

export default function MyModal(props) {
    const { children, modalVisible, setModalVisible, onConfirm, style } = props;
    const onOkPressHandler = () => {
        setModalVisible(false);
        onConfirm();
    };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <Card style={{ ...styles.modalView, ...style }}>
                        {/* MAIN CONTENT */}
                        <View style={styles.mainContentContainer}>
                            {children}
                        </View>
                        {/* ACTION BUTTONS */}
                        <View style={styles.actionContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            >
                                <BodyText style={styles.cancelText}>
                                    Cancel
                                </BodyText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={onOkPressHandler}
                            >
                                <BodyText style={styles.confirmText}>
                                    Confirm
                                </BodyText>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#fff",
    },
    mainContentContainer: {},
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    cancelButton:{
        backgroundColor: Colors.light,
    },
    cancelText:{
        color: Colors.black,
    },
    confirmButton: {
        backgroundColor: Colors.primary,

    },
    confirmText:{
        color: Colors.white,
    },
});
