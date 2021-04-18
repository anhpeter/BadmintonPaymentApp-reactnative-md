import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { Provider, useSelector } from "react-redux";
import MyAppLoading from "./app/components/MyAppLoading";
import HomeScreen from "./app/screens/HomeScreen";
import store from "./app/store/store";

export default function App() {
    const [isLoading, setLoading] = useState(true);
    if (isLoading) return <MyAppLoading setLoading={setLoading} />;
    return (
        <Provider store={store}>
            <HomeScreen />
        </Provider>
    );
}

const styles = StyleSheet.create({});
