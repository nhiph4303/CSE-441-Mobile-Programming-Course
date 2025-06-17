import { createSlice, configureStore } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const mapContacts = (contact) => {
    const { name, picture, phone, cell, email } = contact;

    return {
        id: uuidv4(),
        name: name.first + " " + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: true
    };
};

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contacts: []
    },
    reducers: {
        fetchContactsSuccess: (state, action) => {
            state.contacts = action.payload;
        },
        updateFavorite: (state, action) =>
            state.contacts.map((item) => (item.id == action.payload ? { favorite: !favorite, ...item } : item))
    }
});

export const { fetchContactsSuccess, updateFavorite } = contactSlice.actions;

export const store = configureStore({
    reducer: {
        contacts: contactSlice.reducer
    }
});
