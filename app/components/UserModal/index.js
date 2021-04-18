import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBillCock, setBillCock } from "../../store/slices/billSettingSlice";
import {
    updateCockByUsername,
    getMaxCock,
    updateOtherPriceByUsername,
} from "../../store/slices/usersSlice";
import MyModal from "../MyModal";
import NumberSpinner from "../NumberSpinner";
import ShuttleCockIcon from "../ShuttleCockIcon";
import SubTitleText from "../SubTitleText";

export default function UserModal(props) {
    const dispatch = useDispatch();
    const { user, modalVisible, setModalVisible } = props;
    const { cock: userCock, otherPrice: userOtherPrice } = user;
    const [cock, setCock] = useState(0);
    const [otherPrice, setOtherPrice] = useState(0);
    const maxCock = useSelector(getMaxCock);
    const totalCock = useSelector(getBillCock);

    useEffect(() => {
        if (user && maxCock !== totalCock) dispatch(setBillCock(maxCock));
    }, [totalCock, maxCock, dispatch]);

    useEffect(() => {
        setCock(userCock);
        setOtherPrice(userOtherPrice);
        return ()=>{
            setCock(0);
            setOtherPrice(0);
        }
    }, [modalVisible, userCock, userOtherPrice, setCock, setOtherPrice]);

    const onConfirmHandler = () => {
        if (cock !== userCock)
            dispatch(
                updateCockByUsername({
                    username: user.username,
                    cock,
                })
            );
        if (otherPrice !== userOtherPrice)
            dispatch(
                updateOtherPriceByUsername({
                    username: user.username,
                    otherPrice,
                })
            );
    };
    return (
        <MyModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            style={{ minWidth: 300 }}
            onConfirm={onConfirmHandler}
        >
            <SubTitleText>{user.username}</SubTitleText>
            <View style={styles.mainContent}>
                <View style={styles.item}>
                    <ShuttleCockIcon />
                    <View>
                        <NumberSpinner
                            min={0}
                            step={1}
                            editable={false}
                            onChange={(value) => {
                                setCock(value);
                            }}
                            value={cock}
                        />
                    </View>
                </View>
                <View style={styles.item}>
                    <Text>Other price</Text>
                    <View>
                        <NumberSpinner
                            min={0}
                            step={1000}
                            onChange={(value) => {
                                setOtherPrice(value);
                            }}
                            value={otherPrice}
                        />
                    </View>
                </View>
            </View>
        </MyModal>
    );
}

const styles = StyleSheet.create({
    container: {},
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
