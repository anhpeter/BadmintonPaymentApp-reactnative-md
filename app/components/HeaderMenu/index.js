import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import CustomHeaderButton from "../CustomHeaderButton";

export default function HeaderMenu({ navigation }) {
    const onMenuPressHandler = () => {
        navigation.openDrawer();
    };
    return () => {
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
    };
}

const styles = StyleSheet.create({
    container: {},
});
