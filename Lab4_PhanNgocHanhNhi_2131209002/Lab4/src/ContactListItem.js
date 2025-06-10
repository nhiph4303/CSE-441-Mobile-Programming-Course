import React from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';

const ContactListItem = ({ name, avatar, phone, onPress }) => {
  const displayName = name || 'Unknown';
  const displayPhone = phone || 'No phone';
  const displayAvatar = avatar || 'https://via.placeholder.com/50';

  return (
    <TouchableHighlight
      underlayColor="grey"
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.contactInfo}>
        <Image
          source={{ uri: displayAvatar }}
          style={styles.avatar}
          defaultSource={{ uri: 'https://via.placeholder.com/50' }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{displayName}</Text>
          <Text style={styles.subtitle}>{displayPhone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 0,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: 'blue',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ContactListItem;