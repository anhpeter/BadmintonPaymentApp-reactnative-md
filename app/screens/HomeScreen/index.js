import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    Button,
} from "react-native";
import Card from "../../components/Card";
import AddingUserBar from "../../components/AddingUserBar";
import Bill from "../../components/Bill";
import OptionBoard from "../../components/OptionBoard";
import SubTitleText from "../../components/SubTitleText";
import UserList from "../../components/UserList";
import Screen from "../../components/Screen";
import Colors from "../../constants/Colors";
import ResetButton from "../../components/ResetButton";
import { useDispatch } from "react-redux";
import {
    setPriceOfCock,
    setPriceOfYardPerHour,
} from "../../store/slices/billSlice";
import StorageKey from "../../constants/StorageKey";

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const setCustomSetting = async () => {
            try {
                const priceOfYardPerHour = await AsyncStorage.getItem(
                    StorageKey.priceOfYardPerHour
                );
                if (priceOfYardPerHour !== null)
                    dispatch(
                        setPriceOfYardPerHour(
                            Number.parseInt(priceOfYardPerHour)
                        )
                    );
                const priceOfCock = await AsyncStorage.getItem(
                    StorageKey.priceOfCock
                );
                if (priceOfCock !== null)
                    dispatch(setPriceOfCock(Number.parseInt(priceOfCock)));
            } catch (e) {
                // error reading value
            }
        };
        setCustomSetting();
    }, []);
    return (
        <Screen style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.resetContainer}>
                    <ResetButton />
                </View>
                <View style={styles.block}>
                    <SubTitleText>Setting</SubTitleText>
                    <Card>
                        <OptionBoard />
                    </Card>
                </View>
                {/* 
                <View style={styles.block}>
                    <SubTitleText>Users</SubTitleText>
                    <Card>
                        <AddingUserBar />
                        <UserList />
                    </Card>
                </View>
                 */}
                <View style={styles.block}>
                    <SubTitleText>Bill</SubTitleText>
                    <Card>
                        <AddingUserBar />
                        <Bill />
                    </Card>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
    scrollView: {
        padding: 10,
    },
    resetContainer: {
        alignItems: "flex-end",
    },
    block: {
        marginVertical: 20,
    },
});
