import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ContactListItem from './ContactListItem';
import { fetchContactsSuccess, mapContacts } from './Store';

const keyExtractor = ({ phone }) => phone;

// Dữ liệu tĩnh
const staticContacts = [
  {
    name: { first: 'John', last: 'Doe' },
    picture: { large: 'https://via.placeholder.com/50' },
    phone: '123-456-7890',
    cell: '098-765-4321',
    email: 'john.doe@example.com',
  },
  {
    name: { first: 'Jane', last: 'Smith' },
    picture: { large: 'https://via.placeholder.com/50' },
    phone: '234-567-8901',
    cell: '087-654-3210',
    email: 'jane.smith@example.com',
  },
  {
    name: { first: 'Bob', last: 'Johnson' },
    picture: { large: 'https://via.placeholder.com/50' },
    phone: '345-678-9012',
    cell: '076-543-2109',
    email: 'bob.johnson@example.com',
  },
];

const Contacts = ({ navigation }) => {
  const { contacts } = useSelector((state) => state.contacts || { contacts: [] });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const mappedContacts = staticContacts.map(mapContacts);
      console.log('Mapped static contacts:', mappedContacts);
      if (!dispatch || typeof dispatch !== 'function') {
        console.error('Dispatch is invalid');
        setError('Dispatch failed');
      } else {
        dispatch(fetchContactsSuccess(mappedContacts));
        console.log('Dispatch successful');
      }
      setLoading(false);
    } catch (e) {
      console.error('Error in useEffect:', e);
      setError('Error loading contacts');
      setLoading(false);
    }
  }, [dispatch]);

  console.log('Redux state full:', useSelector((state) => state));
  console.log('Redux state.contacts:', contacts);
  console.log('Navigation object:', navigation);

  const renderContacts = ({ item }) => {
    console.log('Rendering item:', item);
    if (!item) {
      return <Text style={styles.errorText}>Item is undefined</Text>;
    }
    return (
      <ContactListItem
        name={item.name}
        avatar={item.avatar}
        phone={item.phone}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No contacts available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },
});

export default Contacts;