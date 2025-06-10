import { createSlice, configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const mapContacts = (contact) => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: uuidv4(),
    name: name.first + ' ' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1,
  };
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

export const { fetchContactsSuccess } = contactsSlice.actions;

const Store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});

if (!Store || typeof Store.getState !== 'function') {
  console.error('Store creation failed:', Store);
} else {
  console.log('Store created successfully:', Store);
}

export default Store;