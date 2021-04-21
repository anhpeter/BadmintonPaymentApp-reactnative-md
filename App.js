import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { Provider, useSelector } from "react-redux";
import MyAppLoading from "./app/components/MyAppLoading";
import HomeScreen from "./app/screens/HomeScreen";
import SettingScreen from "./app/screens/SettingScreen";
import store from "./app/store/store";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./app/components/CustomHeaderButton";
import Colors from "./app/constants/Colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const menuOption = ({ navigation }) => {
    const onMenuPressHandler = () => {
        navigation.openDrawer();
    };
    return {
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        color={Colors.black}
                        title="menu"
                        iconName="ios-menu"
                        onPress={onMenuPressHandler}
                    />
                </HeaderButtons>
            );
        },
    };
};

const HomeStackNavigator = function () {
    return (
        <Stack.Navigator screenOptions={menuOption}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

const SettingStackNavigator = function () {
    return (
        <Stack.Navigator screenOptions={menuOption}>
            <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
    );
};

export default function App() {
    const [isLoading, setLoading] = useState(true);
    if (isLoading) return <MyAppLoading setLoading={setLoading} />;
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen
                        name="HomeNavigator"
                        component={HomeStackNavigator}
                        options={{ title: "Home" }}
                    />
                    <Drawer.Screen
                        options={{ title: "Setting" }}
                        name="SettingNavigator"
                        component={SettingStackNavigator}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
