import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ListItem from "../ListItem";
import BodyText from "../BodyText";
import UserOptions from "../UserOptions";

export default function User(props) {
    const { user, style, ...rest } = props;
    return (
        <ListItem {...rest}>
            <View style={{ ...styles.container, ...style }}>
                <View>
                    <BodyText>{user.username}</BodyText>
                </View>
                <UserOptions {...props} />
            </View>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 50,
    },
    closeIconContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
});
