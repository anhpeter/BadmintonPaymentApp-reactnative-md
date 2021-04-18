import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { Provider, useSelector } from "react-redux";
import AddingUserBar from "./app/components/AddingUserBar";
import Bill from "./app/components/Bill";
import Card from "./app/components/Card";
import MyAppLoading from "./app/components/MyAppLoading";
import OptionBoard from "./app/components/OptionBoard";
import SubTitleText from "./app/components/SubTitleText";
import UserList from "./app/components/UserList";
import { selectAllUser } from "./app/store/slices/usersSlice";
import store from "./app/store/store";

export default function App() {
    const [isLoading, setLoading] = useState(true);
    if (isLoading) return <MyAppLoading setLoading={setLoading} />;
    return (
        <Provider store={store}>
            <ScrollView>
                <View style={styles.container}>
                    <SubTitleText>Setting</SubTitleText>
                    <Card>
                        <OptionBoard />
                    </Card>
                    <SubTitleText>Users</SubTitleText>
                    <Card>
                        <AddingUserBar />
                        <UserList />
                    </Card>
                    <SubTitleText>Bill</SubTitleText>
                    <Card>
                        <Bill />
                    </Card>
                </View>
            </ScrollView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight,
    },
});
