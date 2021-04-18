import AppLoading from "expo-app-loading";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import FontFamily from "../../constants/FontFamily";

const fetchFonts = () => {
    const prefix = "../../../assets/fonts/Montserrat";
    return Font.loadAsync({
        [FontFamily.montserratMedium]: require(`${prefix}/Montserrat-Medium.ttf`),
        [FontFamily.montserratRegular]: require(`${prefix}//Montserrat-Regular.ttf`),
        [FontFamily.montserratLight]: require(`${prefix}/Montserrat-Light.ttf`),
        [FontFamily.montserratSemiBold]: require(`${prefix}/Montserrat-SemiBold.ttf`),
    });
};

export default function MyAppLoading(props) {
    const { setLoading } = props;
    return (
        <AppLoading
            startAsync={fetchFonts}
            onFinish={() => {
                setLoading(false);
            }}
            onError={(error) => {
                console.log(`loading error: ${error}`);
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {},
});
