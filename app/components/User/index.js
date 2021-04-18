import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import IconWithLabel from "../IconWithLabel";
import ListItem from "../ListItem";
import ShuttleCockIcon from "../ShuttleCockIcon";
import BodyText from "../BodyText";
import OtherIcon from "../OtherIcon";

export default function User(props) {
    const { user, notShowCock = false, style, ...rest } = props;
    const { otherPrice, username } = user;
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
                                label={user.cock}
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
    option: {marginHorizontal: 10},
});
