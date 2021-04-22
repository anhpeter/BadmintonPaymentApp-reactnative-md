import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import MyAppLoading from "./app/components/MyAppLoading";
import HomeScreen from "./app/screens/HomeScreen";
import SettingScreen from "./app/screens/SettingScreen";
import store from "./app/store/store";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HeaderMenu from "./app/components/HeaderMenu";
import FontFamily from "./app/constants/FontFamily";

const screenOptions = ({ navigation }) => {
    return {
        headerLeft: HeaderMenu({ navigation }),
        headerTitleStyle: {
            fontFamily: FontFamily.montserratMedium,
        },
    };
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = function () {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

const SettingStackNavigator = function () {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
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
