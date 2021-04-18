import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import IconWithLabel from "../IconWithLabel";
import ListItem from "../ListItem";
import ShuttleCockIcon from "../ShuttleCockIcon";
import BodyText from "../BodyText";
import OtherIcon from "../OtherIcon";
import TimeIcon from "../TimeIcon";
import TimeString from "../TimeString";

export default function User(props) {
    const {
        user,
        notShowCock = false,
        style,
        notShowTime = false,
        ...rest
    } = props;
    const { cock, playingTime, otherPrice, username } = user;
    return (
        <ListItem {...rest}>
            <View style={{ ...styles.container, ...style }}>
                <View>
                    <BodyText>{username}</BodyText>
                </View>
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
                                label={
                                    <TimeString
                                        time={playingTime}
                                        color="black"
                                    />
                                }
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
