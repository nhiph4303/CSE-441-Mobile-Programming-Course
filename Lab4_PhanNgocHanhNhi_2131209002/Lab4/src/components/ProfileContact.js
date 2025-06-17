import { StyleSheet, View, Text } from 'react-native';
import ContactThum from './ContactThum';
import DetailListItem from './DetailListItem';
import { IconButton } from 'react-native-paper';
import { updateFavorite } from '../store';
import { useDispatch } from 'react-redux';

const ProfileContact = ({ route }) => {
  const dispatch = useDispatch();
  const { contact } = route.params;
  const { id, avatar, name, email, phone, cell, favorite } = contact;

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem
          style={styles.title}
          icon="email"
          title="Email"
          subtitle={email}
        />
        <DetailListItem
          style={styles.title}
          icon="phone"
          title="Work"
          subtitle={phone}
        />
        <DetailListItem
          style={styles.title}
          icon="cellphone"
          title="Personal"
          subtitle={cell}
        />
        <View>
          <IconButton
            mode={'outlined'}
            icon={favorite ? 'star-check' : 'star-check-outline'}
            iconColor={'white'}
            size={20}
            onPress={() => dispatch(updateFavorite(id))}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background color for the whole container
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue', // Background color for avatar section
    paddingVertical: 30, // Adjust vertical padding to match the design
  },
  title: {
    fontWeight: 500,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailsSection: {
    flex: 2,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

export default ProfileContact;
