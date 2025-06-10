import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ContactThumb from './ContactThumb';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const { contacts } = useSelector((state) => state.contacts || { contacts: [] });
  const favorites = contacts.filter((contact) => contact.favorite);

  console.log('Favorites contacts:', contacts);
  console.log('Favorites filtered:', favorites);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumb
        avatar={avatar}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No favorite contacts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={renderFavoriteThumbnail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favorites;