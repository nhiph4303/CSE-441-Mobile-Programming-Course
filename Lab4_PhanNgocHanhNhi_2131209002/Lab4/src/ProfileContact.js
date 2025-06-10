// ProfileContact.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContactThumb from './ContactThumb';
import DetailListItem from './DetailListItem';
import { IconButton } from 'react-native-paper';

const ProfileContact = ({ route }) => {
  const contact = route?.params?.contact;
  if (!contact) {
    return (
      <View style={styles.centered}>
        <Text>No contact data available</Text>
      </View>
    );
  }

  const { avatar, name, email, phone, cell, favorite } = contact;

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumb avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} />
        <DetailListItem icon="phone" title="Work" subtitle={phone} />
        <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
        <View style={{ alignItems: 'center' }}>
          <IconButton
            icon={favorite ? 'star' : 'star-outline'}
            iconColor="#663399"
            size={20}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileContact;