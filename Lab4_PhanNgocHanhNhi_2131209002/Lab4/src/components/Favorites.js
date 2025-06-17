import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { StyleSheet, View, FlatList } from "react-native";
import ContactThumbnail from "./ContactThum";

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const { contacts } = useSelector((state) => state.contacts);
    console.log({ contacts });
    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate("ProfileContact", { contact: item })}
            />
        );
    };

    const favorites = contacts.filter((contact) => contact.favorite);
    console.log({ favorites });
    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                // contentContainerStyle={styles.list}
                renderItem={renderFavoriteThumbnail}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "center",
        flex: 1
    },
    list: {
        alignItems: "center"
    }
});

export default Favorites;
