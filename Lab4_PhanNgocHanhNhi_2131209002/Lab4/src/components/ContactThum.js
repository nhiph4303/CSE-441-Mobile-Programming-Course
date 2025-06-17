import 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactThum = ({ name, phone, avatar, textColor, onPress }) => {
  const colorStyle = {
    color: textColor,
  };

  const ImageContact = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageContact onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </ImageContact>
      {name && <Text style={[styles.name, colorStyle]}>{name}</Text>}
      {phone && phone !== '' && (
        <View style={styles.phoneSection}>
          <MaterialCommunityIcons
            name="phone"
            size={16}
            style={{ color: 'white' }}
          />
          <Text style={[styles.phone, colorStyle.color]}>{phone}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: 'bold',
    color: '#ffff',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
  },
});

export default ContactThum;
