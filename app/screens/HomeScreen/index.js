import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import Card from "../../components/Card";
import AddingUserBar from "../../components/AddingUserBar";
import Bill from "../../components/Bill";
import OptionBoard from "../../components/OptionBoard";
import SubTitleText from "../../components/SubTitleText";
import UserList from "../../components/UserList";
import Screen from "../../components/Screen";

export default function HomeScreen(props) {
    return (
        <Screen style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.block}>
                    <SubTitleText>Setting</SubTitleText>
                    <Card>
                        <OptionBoard />
                    </Card>
                </View>
                <View style={styles.block}>
                    <SubTitleText>Users</SubTitleText>
                    <Card>
                        <AddingUserBar />
                        <UserList />
                    </Card>
                </View>
                <View style={styles.block}>
                    <SubTitleText>Bill</SubTitleText>
                    <Card>
                        <Bill />
                    </Card>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    scrollView: {
        padding: 10,
        backgroundColor: "#fff",
    },
    block: {
        marginVertical: 20,
    },
});
