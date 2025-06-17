import { View, StyleSheet, TouchableHighlight, Text, Image } from "react-native";

const ContactListItem = ({ name, avatar, phone, onPress }) => {
    return (
        <TouchableHighlight underlayColor="grey" style={styles.container} onPress={onPress}>
            <View style={styles.contactInfo}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <View style={styles.details}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subTitle}>{phone}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0
    },
    contactInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 24,
        borderBottomColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50
    },
    details: {
        justifyContent: "center",
        flex: 1,
        marginLeft: 25
    },
    title: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    },
    subTitle: {
        color: "blue",
        fontSize: 14,
        marginTop: 4
    }
});

export default ContactListItem;
