import React from "react";
import { Text, View, StyleSheet } from "react-native";
import IconWithLabel from "../IconWithLabel";
import ShuttleCockIcon from "../ShuttleCockIcon";
import OtherIcon from "../OtherIcon";
import TimeIcon from "../TimeIcon";
import TimeString from "../TimeString";

export default function UserOptions(props) {
    const {
        user,
        notShowCock = false,
        notShowTime = false,
    } = props;
    const { cock, playingTime, otherPrice, username } = user;
    return (
        <View style={styles.optionsContainer}>
            {/* COCK */}
            {!notShowCock ? (
                <View style={styles.option}>
                    <IconWithLabel
                        labelPos="l"
                        icon={<ShuttleCockIcon />}
                        label={cock}
                    />
                </View>
            ) : null}
            {/* TIME */}
            {!notShowTime ? (
                <View style={styles.option}>
                    <IconWithLabel
                        labelPos="l"
                        icon={<TimeIcon />}
                        label={<TimeString time={playingTime} color="black" />}
                    />
                </View>
            ) : null}
            {/* OTHER PRICE */}
            {otherPrice > 0 ? (
                <View style={styles.option}>
                    <OtherIcon />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
});
