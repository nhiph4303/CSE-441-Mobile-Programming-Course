import { mapContacts } from "../store";
import { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsSuccess } from "../store";
import ContactListItem from "./ContactListItem";
import { staticContacts } from "../mockData";

const keyExtractors = ({ phone }) => phone;

const fetchContacts = async () => {
    console.log("Hello");
    const response = await fetch("https://randomuser.me/api/?results=5", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        credentials: "same-origin"
    });

    const data = await response.json();
    return await data.results.map(mapContacts);
};

const Contacts = ({ navigation }) => {
    console.log("Contact");
    const { contacts } = useSelector((state) => state.contacts);

    const dispatch = useDispatch();

    useEffect(() => {
        // fetchContacts().then((contacts) => {
        //   console.log({ contacts });

        //  dispatch(fetchContactsSuccess(contacts));
        // });
        const parsedData = staticContacts.map(mapContacts);
        dispatch(fetchContactsSuccess(parsedData));
    }, []);

    const renderContacts = ({ item }) => {
        const { name, avatar, phone } = item;
        return (
            <ContactListItem
                name={name}
                avatar={avatar}
                phone={phone}
                onPress={() => navigation.navigate("ProfileContact", { contact: item })}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList data={contacts} renderItem={renderContacts} keyExtractor={keyExtractors} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 10
    }
});

export default Contacts;
